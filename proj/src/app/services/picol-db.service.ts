/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
const { App, Http } = Plugins;
import { interval } from 'rxjs';
import { LogsService } from '../services/logs.service';
import '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})

export class PicolDbService {
  private inpData: any[] = [];
  private appData: any = [];
  public filteredData: any = [];
  private filterString = '';
  public reloadInterval = 30;
  public lastLoaded = Date.now() - this.reloadInterval * 60 * 1000;
  public loadingFlag: boolean = false;
  public errorFlag: boolean = false;
  public errorMsg: string = '';
  public successFlag: boolean = false; 
  public successMsg: string = '';
  private isActive: boolean = true;
  source = interval(1000 * 60);
  subscribe = this.source.subscribe(val => { 
    if (this.isActive) {
      this.reloadIfTooOld(this.reloadInterval); 
    }
  });
  theURL = 'https://picol.cahnrs.wsu.edu/api/v1/Public/GetLabelsByCropIds?cropids=6&cropids=7&cropids=8&cropids=257&cropids=279&cropids=280&apiKey=************************************&currentYear=true&state=1&acceptTos=true';

  constructor(private logs: LogsService) {
    App.addListener('appStateChange', (state: AppState) => {
      // state.isActive contains the active state
      this.isActive = state.isActive;
      if (this.isActive) {
        this.reloadIfTooOld(this.reloadInterval);
        logs.logInfo('evStateChange', 'inactive => active', '', '');
      } else {
        logs.logInfo('evStateChange', 'active => inactive', '', '');
      }
    });
    this.loadPicolData();
  }

  private reloadIfTooOld(mins) {
    let t = Date.now();
    let t0 = this.lastLoaded;
    if (!(this.loadingFlag) && (t > (t0 + mins * 60 * 1000))) {
      this.loadPicolData();
    } else {
    }
  }

  async processData() {
    // filter for only Commercial use records
    // remove cruft from pesticide name
    // promote the date field so it's not nested
    // sort by product name
    let t0 = Date.now();
    this.appData = [];
    for(let rec of this.inpData) {
      if(rec.IntendedUser.Code == "C") {
        for(let state of rec.StateRecords) {
          if (state.StateId == 1) {
            rec.SupplementalExpiration = state.Year;
            rec.WAYear = state.Year;
          }
        }
        let name = rec.Name;
        let pos = name.indexOf(' [');
        if (pos > 2) {
          rec.Name = name.slice(0, pos);
        }
        this.appData.push(rec);
      }
    }
    let t1 = Date.now();
    this.appData.sort(function (a, b) {
      let nameA = a.Name;
      nameA = nameA.toLowerCase();
      let nameB = b.Name;
      nameB = nameB.toLowerCase();
      if (nameA > nameB) {
        return 1;
      } else {
        return -1;
      }
    });
    let t2 = Date.now();
    // this.successMsg = `${this.successMsg}Processing time: ${(t1 - t0) / 1000} secs<br>Sort time: ${(t2 - t1) / 1000} secs<br>Total: ${(t2 - t0) / 1000} secs<br>`; 
  }

  private async loadPicolData() {
    this.loadingFlag = true;
    this.errorFlag = false;
    this.errorMsg = '';
    this.successFlag = false;
    this.successMsg = '';
    try {
      let t0 = Date.now();
      const ret = await Http.request({
        method: 'GET',
        url: this.theURL
      });
      let t1 = Date.now();
      this.successFlag = true;
      // this.successMsg = 'Download time ' + (t1 - t0)/1000 + ' secs' + '<br>';
      this.inpData = ret.data.Data;
      // this.successMsg = this.successMsg + this.inpData.length + ' records' + '<br>';
      await this.processData();
      let d = new Date(); 
      // this.successMsg = this.successMsg + this.appData.length + ' filtered records' + '<br>' + d + '<br>';
      this.successMsg = this.successMsg + d + '<br>';
      this.lastLoaded = Date.now();
      this.filterLabels(this.filterString);
    } catch (err) {
      this.errorFlag = true;
      this.errorMsg = err;
      console.log('the error is: ' + err);
    }
    this.loadingFlag = false;
  }

  private sortData() {
    this.appData.sort(function (a, b) {
      let nameA = a.Name;
      nameA = nameA.toLowerCase();
      let nameB = b.Name;
      nameB = nameB.toLowerCase();
      if (nameA > nameB) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  getPicolData() {
    return this.appData;
  }

  async reloadPicolData() {
    await this.loadPicolData();
  }

  getFilterString() {
    return this.filterString;
  }

  filterLabels(queryString) {
    let qString = queryString.toLowerCase();
    // qString = qString.trim(); // leave leading/trailing spaces to allow searching them
    this.filterString = qString;
    if(qString.trim() == '') {
      this.filteredData = this.appData;
    } else {
      this.filteredData = [];
      for (let theLabel of this.appData) {
        if ((theLabel.Name.toLowerCase().indexOf(qString) > -1) ||
            (theLabel.EpaNumber.toLowerCase().indexOf(qString) > -1) || 
            (theLabel.Registrant.Name.toLowerCase().indexOf(qString) > -1) ) {
          this.filteredData.push(theLabel);
        }
      }  
    }
  }

}

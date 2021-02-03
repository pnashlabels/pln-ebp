/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelDbService { 
  fname = '../assets/data/labels.json';
  private rawData: [] = [];
  private appData: any = [];
  private filteredData: any = [];
  private qString = '';

  constructor() {
    this.loadData();
  }
  private loadData() {
    if (this.rawData.length < 1) {
      fetch(this.fname).then(res => res.json())
        .then(json => {
          this.rawData = json;
          this.getAppData();
          this.sortData();
        });
    }
  }

  getQueryString() {
    return this.qString;
  }

  private sortData() {
    this.appData.sort(function (a, b) {
      let nameA = a.productName;
      nameA = nameA.toLowerCase();
      let nameB = b.productName;
      nameB = nameB.toLowerCase();
      if (nameA > nameB) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  private getAppData() {
    let i = 0;
    let n = 0;
    const obj = this.rawData;
    for (var key in obj) {
      const label: any = obj[key];
      if ((label.appship == 'yes') && (label.statusCompleted == 'yes')) {
        this.appData.push(label);
        i++;
      }
      n++;
    }
  }

  getLabels() {
    return this.appData;
  }

  getFilteredLabels(queryString) {
    this.filteredData = [];
    this.qString = queryString.toLowerCase();
    for (let theLabel of this.appData) {
      if ((theLabel.productName.toLowerCase().indexOf(this.qString) > -1) ||
          (theLabel.epaReg.toLowerCase().indexOf(this.qString) > -1) || 
          (theLabel.producerName.toLowerCase().indexOf(this.qString) > -1) ) {
        this.filteredData.push(theLabel);
      }
    }
    return this.filteredData;
  }


}

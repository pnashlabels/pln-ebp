/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { PicolDbService } from '../services/picol-db.service';
import { DataService } from '../services/data.service';
import { StaticTextService } from '../services/static-text.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.page.html',
  styleUrls: ['./tab-search.page.scss'],
})

export class TabSearchPage implements OnInit {
  private lg = 'en';
  showTranslate: boolean;
  currYear = 2020;
  lastYear = 2019;

  private readonly pageName = 'PICOL Search';

  constructor(
    public picolDB: PicolDbService,
    public staticService: StaticTextService,
    private navController: NavController,
    private logs: LogsService,
    public theData: DataService) { }

  ngOnInit() {
    this.showTranslate = this.theData.getShowTranslate();
    this.lg = this.theData.getLang();
    let d = new Date();
    this.currYear = d.getFullYear();
    this.lastYear = this.currYear - 1;
  }

  ionViewDidEnter() {
    this.logs.logInfo('evViewPage', this.pageName, this.lg, '');
  }

  switchLanguage() {
    this.lg = this.theData.lg;
    let oldlg = this.lg;
    if (this.lg == 'en') {
      this.lg = 'es';
    } else {
      this.lg = 'en';
    }
    this.theData.setLang(this.lg);
    this.logs.logInfo('evLanguageToggle', this.pageName, oldlg + '=>' + this.lg, '');
  }

  showRecordCount() {
    let countPicol = this.picolDB.filteredData.length;
    console.log(countPicol + ' labels');
  }

  getFilteredLabels(event) {
    // deal with the query string
    let queryString = event.target.value;

    if ((queryString == undefined) || (queryString.trim() == '')) {
      queryString = '';
    }
    this.picolDB.filterLabels(queryString);
    this.showRecordCount();
  }

  goPicolInfo(info) {
    this.theData.setCurrPicolInfo(info);
    this.logs.logInfo('evViewPICOL', info.EpaNumber, info.Name, this.picolDB.getFilterString());
    this.navController.navigateForward('/picol-display');
  }

}

/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { StaticTextService } from '../services/static-text.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogsService } from '../services/logs.service';
import { OpenFilesService } from '../services/open-files.service';

@Component({
  selector: 'app-picol-display',
  templateUrl: './picol-display.page.html',
  styleUrls: ['./picol-display.page.scss'],
})
export class PicolDisplayPage implements OnInit {
  picolInfo: any = null;
  signalWord = '';
  organic = '';
  picolURL = '';
  producerURL = '';
  private lg = '';
  showTranslate: boolean;
  currYear = 2020;
  lastYear = 2019;
  desc3 = '';

  private readonly pageName = 'PICOL Label';

  constructor(
    public staticService: StaticTextService,
    public theData: DataService,
    private navController: NavController,
    private logs: LogsService,
    private openFiles: OpenFilesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.picolInfo = this.theData.getCurrPicolInfo();
    this.signalWord = this.expandSignalWord(this.picolInfo.SignalWord);
    this.organic = this.bool2yesno(this.picolInfo.Organic);
    this.picolURL = this.genPicolURL(this.picolInfo.Id, 1); // stateID = 1 for WA, 2 for OR
    this.producerURL = this.genLinkURL(this.picolInfo.Registrant.Website);
    this.lg = this.theData.getLang();
    this.showTranslate = this.theData.getShowTranslate();
    let d = new Date();
    this.currYear = d.getFullYear();
    this.lastYear = this.currYear - 1; 
    this.desc3 = this.picolInfo.Name + ' | epa: ' + this.picolInfo.EpaNumber;
  }

  ionViewDidEnter() {
    this.logs.logInfo('evViewPage', this.pageName, this.lg, this.desc3);
  }

  viewLabelClick() {
    this.logs.logInfo('evDownloadLabel', this.picolInfo.EpaNumber, this.picolInfo.Name, 'PICOL');
    let fname = Date.now() + '.pdf';
    this.openFiles.downloadOpenAFile(this.picolURL, fname);
  }

  switchLanguage() {
    this.lg = this.theData.lg;
    let oldlg = this.lg;
    if(this.lg == 'en') {
      this.lg = 'es';
    } else { 
      this.lg = 'en';
    }
    this.theData.setLang(this.lg);
    this.logs.logInfo('evLanguageToggle', this.pageName, oldlg + '=>' + this.lg, '');
  }

  genLinkURL(link) {
    link = link.trim();
    if(link != '') {
      if(link.search('//') < 0) {
        link = 'http://' + link;
      }
    }
    return link;
  }

  genUsage(code: string) {
    code = code.toUpperCase().trim();
    switch (code) {
      case 'A': 
        return 'AERIAL';
      case 'G':
        return 'GROUND';
      case 'I':
        return 'IRRIGATION';
      case 'P':
        return 'PLANT DIP';
      case 'S': 
        return 'SEED TREATMENT';
      default:
        return code;
    }
  }

  genPicolURL(picolID: number, stateID: number) {
    const urlRoot = 'https://picol.cahnrs.wsu.edu/Download/LabelById';
    let url = urlRoot + '?id=' + picolID.toString() + '&stateId=' + stateID.toString();
    return url;
  }

  bool2yesno(f: boolean) {
    return f ? 'YES' : 'NO';
  }

  expandSignalWord(cd) {
    switch (cd) {
      case 'C':
        return 'CAUTION';
      case 'W':
        return 'WARNING';
      case 'T':
        return 'DANGER/POISON';
      case 'D':
        return 'DANGER';
      case 'N':
        return 'NO SIGNAL WORD GIVEN';
      default:
        return '';
    }
  }

  goBack() {
    this.navController.navigateBack('tabshost/tab-search');
  }

}

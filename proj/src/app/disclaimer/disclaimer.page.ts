/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { StaticTextService } from '../services/static-text.service';
import { NavController } from '@ionic/angular';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {
  lg = null;
  statics: any = null;
  static: any = null;
  showContinue = true; // only true the first time this page has displayed.
  showBackButton = false; // true only if the page has been continued from.
  trademarkStatic = '';
  showTranslate: boolean;
  copyright = '';

  private readonly pageName = 'Disclaimer';

  constructor(
    public storage: Storage,
    public theData: DataService,
    public staticService: StaticTextService,
    private navController: NavController,
    private router: Router,
    private logs: LogsService) { }

  ionViewWillEnter() {
    this.showContinue = this.theData.getDisclaimerContinue();
    this.showBackButton = !(this.showContinue);
  }

  ionViewWillLeave() {
    this.theData.setDisclaimerContinue(false);
  }

  ionViewDidEnter() {
    this.logs.logInfo('evViewPage', this.pageName, this.lg, '');
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
    this.static = this.statics[this.lg].disclaimer;
    this.trademarkStatic = this.statics[this.lg].fineprint.trademark;
    this.logs.logInfo('evLanguageToggle', this.pageName, oldlg + '=>' + this.lg, '');
  }

  ngOnInit() {
    this.lg = this.theData.getLang();
    this.showTranslate = this.theData.getShowTranslate();
    this.copyright = this.theData.getCopyright();
    this.statics = this.staticService.getStaticText();
    this.static = this.statics[this.lg].disclaimer;
    this.trademarkStatic = this.statics[this.lg].fineprint.trademark;
  }

  goListTab() {
    this.showContinue = false; // don't show the continue button next time this page displays
    this.showBackButton = true;
    this.navController.navigateRoot('/tabshost');
  }

  goBack() {
    this.showContinue = false;
    this.navController.navigateBack('/tabshost/more');
  }
}

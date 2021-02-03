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
import { AppInfoService } from '../services/app-info.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  lg = 'en';
  copyright = '';
  appName: string;
  packageName: string;
  versionCode: number | string;
  versionNumber: number | string;
  showTranslate: boolean;
  fundingText = '';

  private readonly pageName = 'About';

  getVersionInfo() {
    this.appName = this.appInfoService.getAppName();
    this.packageName = this.appInfoService.getPackageName();
    this.versionNumber = this.appInfoService.getVersionNumber();
    this.versionCode = this.appInfoService.getVersionCode();
  }

  constructor(
    private navController: NavController,
    public theData: DataService, 
    public staticService: StaticTextService,
    private appInfoService: AppInfoService,
    private logs: LogsService
    ) { }

  ngOnInit() {
    this.lg = this.theData.getLang();
    this.copyright = this.theData.getCopyright();
    this.showTranslate = this.theData.getShowTranslate();
    this.getVersionInfo();
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
    this.logs.logInfo('evLanguageToggle', this.pageName, oldlg + '=>' + this.lg, '');
  }

  goBack() {
    this.navController.navigateBack('/tabshost/more');
  }

}

/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { StaticTextService } from '../services/static-text.service';
import { NavController } from '@ionic/angular';
import { AppInfoService } from '../services/app-info.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // private eulaAccepted = null;
  previousVersion: string;
  copyright: string;

  constructor(
    public storage: Storage,
    private router: Router,
    private navController: NavController,
    public staticText: StaticTextService, // force the load from the json file
    private appInfoService: AppInfoService,
    public theData: DataService,
    public appInfo: AppInfoService,
    public logs: LogsService) {
    this.storage.get('VersionCode').then(value => {
      this.previousVersion = value;
    }).catch(err => {
      this.previousVersion = '';
    });
    this.copyright = this.theData.getCopyright();
  }

  ionViewDidEnter() {
    this.getLocInfo();
  }

  async getLocInfo(){
    await this.appInfoService.getLocationInfo();
  }

  goNextEn() {
    const lg = 'en';
    this.storage.set('Language', lg);
    this.theData.setLang(lg);

    this.navController.navigateRoot('/tabshost');
    /* if (this.appInfoService.getVersionCode() != this.previousVersion) {
      this.navController.navigateForward('/eula');
    } else {
      this.navController.navigateForward('/disclaimer');
    } */
  }

  goNextEs() {
    const lg = 'es';
    this.storage.set('Language', lg);
    this.theData.setLang(lg);

    this.navController.navigateRoot('/tabshost');
    /* if (this.appInfoService.getVersionCode() != this.previousVersion) {
      this.navController.navigateForward('/eula');
    } else {
      this.navController.navigateForward('/disclaimer');
    } */
  }

}

/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { StaticTextService } from '../services/static-text.service';
import { PicolDbService } from '../services/picol-db.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AppInfoService } from '../services/app-info.service';
import { LogsService } from '../services/logs.service';


@Component({
  selector: 'app-tabshost',
  templateUrl: './tabshost.page.html',
  styleUrls: ['./tabshost.page.scss'],
})
export class TabshostPage {
  lg: string = 'en';
  view: string = 'view';
  close: string = 'close';
  documents: string = 'disclaimer and license agreement';
  static: any = null;
  statics: any = null;

  constructor(
    public staticService: StaticTextService,
    public picolDB: PicolDbService,
    public toastController: ToastController,
    public navController: NavController,
    public theData: DataService,
    private appInfo: AppInfoService,
    private logs: LogsService) {
  }

  ngOnInit() {
    this.lg = this.theData.getLang();
    this.statics = this.staticService.getStaticText();
    this.static = this.statics[this.lg].tabs;
    this.view = this.static.view;
    this.documents = this.static.documents;
    this.close = this.static.close;
    this.presentToast();
    this.logs.logInfo('evStart', this.appInfo.getVersion(), this.logs.platformStr + ',' + this.logs.devInfo, this.appInfo.locString)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: this.documents,
      duration: 10000,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'search',
          text: this.view,
          handler: () => {
            this.navController.navigateForward('/tabshost/more');
          }
        }, {
          text: this.close,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }




}

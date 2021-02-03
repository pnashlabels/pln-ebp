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
import { LogsService } from '../services/logs.service';
import { AppInfoService } from '../services/app-info.service';
import { UpdatesService, UpdateRecord } from '../services/updates.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  public lg: string = '';
  public showTranslate: boolean = true;
  private readonly pageName = 'Update News';
  public updateList: Observable<UpdateRecord[]>; 
  public currVersionCode: number | string = 0;
  public currVersion: string = '';
  public latestVersionCode: number | string = 0;
  public latestVersion: string = '';

  constructor(
    private navController: NavController,
    public theData: DataService,
    public staticService: StaticTextService,
    private logs: LogsService,
    public updatesService: UpdatesService,
    public appInfoService: AppInfoService
  ) { }

  ngOnInit() {
    this.lg = this.theData.getLang();
    this.showTranslate = this.theData.getShowTranslate();
    this.updateList = this.updatesService.getUpdatesList();
  }

  ionViewDidEnter() {
    this.logs.logInfo('evViewPage', this.pageName, this.lg, '');
    this.currVersionCode = this.appInfoService.getVersionCode();
    this.currVersion = this.appInfoService.getVersion();
  }

  goBack() {
    this.navController.navigateBack('/tabshost/more');
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

}

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

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {
  lg = 'en';
  /* statics: any = null;
  static: any = null;
  industryPartnerText = '';
  thankYouText = ''; */
  showTranslate: boolean;
  private readonly pageName = 'Partners';

  // copyright = '';

  constructor(
    private navController: NavController,
    public theData: DataService, 
    public staticService: StaticTextService,
    private logs: LogsService
  ) { }

  goBack() {
    this.navController.navigateBack('/tabshost/more');
  }

  ngOnInit() {
    this.lg = this.theData.getLang();
    // this.copyright = this.theData.getCopyright();
    this.showTranslate = this.theData.getShowTranslate();
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

}

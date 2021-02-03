/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';
// import { PicolDbService } from '../services/picol-db.service';
// import { LabelDbService } from '../services/label-db.service';

@Injectable({
  providedIn: 'root'
})

/*  Service (formerly provider) that is meant to be a single instance
    of data shared between the various units. 
*/

export class DataService {

  public lg = 'en';
  private currLabel: any = null;
  private disclaimerContinue = true;
  private showTranslate = true;
  private copyright = '© 2020-2021 The State of Washington';
  private currPicolInfo: any = null;
  
  constructor(
    // public labelDbService: LabelDbService, 
    // public picolDbService: PicolDbService 
  ) { }

  getCopyright() {
    return this.copyright;
  }

  getShowTranslate() {
    return this.showTranslate;
  }

  getLang() {
    return this.lg;
  }

  setLang(lg) {
    this.lg = lg;
  }

  getCurrLabel() {
    return this.currLabel;
  }

  setCurrLabel(label) {
    this.currLabel = label;
  }

  getDisclaimerContinue() {
    return this.disclaimerContinue;
  }

  setDisclaimerContinue(flag) {
    this.disclaimerContinue = flag;
  }

  getCurrPicolInfo() {
    return this.currPicolInfo;
  }

  setCurrPicolInfo(info) {
    this.currPicolInfo = info;
  }


}

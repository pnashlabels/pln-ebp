/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Plugins, GeolocationOptions, GeolocationPosition } from '@capacitor/core';
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {
  private appName: string;
  private packageName: string;
  private versionCode: string | number = 38; // default value
  private versionNumber: string = '1.0.7';   // default value
  private location: GeolocationPosition = null;
  public locString: string = 'n/a';

  getAppName() {
    return this.appName;
  }

  getPackageName() {
    return this.packageName;
  }

  getVersionCode(): string | number {
    return this.versionCode;
  }

  getVersionNumber(): string {
    return this.versionNumber;
  }

  getVersion(): string {
    return this.versionNumber + ' (' + this.versionCode + ')'; 
  }

  getVersionInfo() {
    this.appVersion.getAppName().then(value => {
      this.appName = value;
    }).catch(err=> {
      this.appName = '';
    });

    this.appVersion.getPackageName().then(value => {
      this.packageName = value;
    }).catch(err=> {
      this.packageName = '';
    });

    this.appVersion.getVersionCode().then(value => {
      this.versionCode = value;
    }).catch(err=> {
      // this.versionCode = ''; // just use the default
    });

    this.appVersion.getVersionNumber().then(value => {
      this.versionNumber = value;
    }).catch(err=> {
      // this.versionNumber = ''; // just use the default
    });
  }

  fuzzValue(val: number) {
    const fuzzRadius = 0.002672;
    let rnd = Math.random();
    let fuzz = 2 * fuzzRadius * rnd - fuzzRadius;
    let newval = val + fuzz;
    return newval;
    // return val;
  }

  async getLocationInfo() {
    try {
          this.location = await Geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true, maximumAge: 3600});
          // console.log (this.location);
          // console.log (this.location.coords.latitude);
          // console.log (this.location.coords.longitude);
          let lat = this.fuzzValue(this.location.coords.latitude);
          let lon = this.fuzzValue(this.location.coords.longitude);
          // console.log(lat);
          // console.log(lon);
          this.locString = '(' + lat + ',' + lon + ')';
          } catch (error) {
      console.log('error getting location: ');
      console.log('Error Code: ' + error.code);
      console.log('Error Message: ' + error.message);
      this.locString = 'n/a';
    }
    
    console.log (this.locString);
  }

  constructor(private appVersion: AppVersion) { 
    this.getVersionInfo();
  }
}

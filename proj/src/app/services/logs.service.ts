/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
import { Platform } from '@ionic/angular';

export interface logRecord {
  id?: string;
  aid: string;
  ts: string;
  evType: string;
  evDesc1: string;
  evDesc2: string;
  evDesc3: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private logCollection: AngularFirestoreCollection<logRecord>;
  private aid: string = '';
  devInfo: string = '';
  private info: any = null;
  public platforms: string[] = [];
  public platformStr: string = '';

  genPlatformStr() {
    let rslt = '';
    for (let i = 0; i < this.platforms.length; i++) {
      if (i > 0) {
        rslt += ', ';
      }
      rslt += this.platforms[i];
    }
    this.platformStr = rslt;
  }

  getPlatformInfo() {
    let rslt = '';
    let platforms = this.platform.platforms();
    for (let i = 0; i < platforms.length; i++) {
      if (i > 0) {
        rslt += ','
      }
      rslt += platforms[i];
    }
    return rslt;
  }

  async getDevInfo() {
    this.info = await Device.getInfo();
    this.aid = await this.hashIt(this.info.uuid);
    // console.log('uuid: ' + this.info.uuid);
    // console.log('aid: ' + this.aid);
    this.devInfo =
      this.info.manufacturer + ',' +
      this.info.model + ',' +
      this.info.operatingSystem + ',' +
      this.info.osVersion + ',' +
      this.info.platform;
  }

  async hashIt(s) {
    const msg = new TextEncoder().encode(s);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);  // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));       // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }



  constructor(private afs: AngularFirestore, private fireauth: AngularFireAuth, private platform: Platform) {
    this.logCollection = this.afs.collection<logRecord>('logs');
    this.getDevInfo();
    this.signInAnonymously();
    this.platformStr = this.getPlatformInfo();
  }

  private signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        reject(`login failed ${error.message}`)
        // ...
      });
    });
  }

  addLog(log: logRecord): Promise<DocumentReference> {
    return this.logCollection.add(log);
  }

  logInfo(evTyp: string, evDesc1: string, evDesc2: string, evDesc3: string) {
    let d = new Date();
    // 2020-08-04T19:56:14.104Z
    let ds = d.toISOString();
    let log: logRecord = {
      aid: this.aid,
      ts: ds,
      evType: evTyp,
      evDesc1: evDesc1,
      evDesc2: evDesc2,
      evDesc3: evDesc3
    };
    return this.addLog(log);
  }

}

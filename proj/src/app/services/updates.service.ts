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
import { Observable } from 'rxjs';

export interface UpdateRecord {
  id: string;
  versionNumber: string;
  versionCode: number;
  versionDate: string;
  versionInfoEN: string;
  versionInfoES: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {
  private updateCollection: AngularFirestoreCollection<UpdateRecord>;
  private updateCollectionRef: AngularFirestoreCollection;
  private updateInfo: UpdateRecord;
  updatesRef: AngularFirestoreCollection<UpdateRecord> = null;

  constructor(private afs: AngularFirestore, private fireauth: AngularFireAuth) {
    this.signInAnonymously();
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

  public getUpdatesRef() {
    if (this.updatesRef == null) {
      this.updatesRef = this.afs.collection('updates');
    }
    return this.updatesRef;
  }

  public getLatestVerCode() {

  }

  getUpdatesList(): Observable<UpdateRecord[]> {
    return this.afs.collection<UpdateRecord>('updates').valueChanges();
  }

}



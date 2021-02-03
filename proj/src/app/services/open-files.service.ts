/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import '@capacitor-community/http';
const { Http, Filesystem } = Plugins;
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class OpenFilesService {

  constructor(private fileOpener: FileOpener, private file: File, private platform: Platform) { }

  openExisting() {
    if (this.platform.is('android')) {
      this.openExistingFileAndroid('test.pdf');
    } else {
      this.openExistingFileiOS('test.pdf');
    }
  }

  async openExistingFileiOS(fname: string) {
    // with Ionic 5, 'www/assets' has changed to 'public/assets'
    let filePath = this.file.applicationDirectory + 'public/assets/' + fname;
    try {
      await this.fileOpener.open(filePath, 'application/pdf');
    } catch (error) {
      console.log(error);
    }
  }

  async openExistingFileAndroid(fname: string) {
    // with Ionic 5, 'www/assets' has changed to 'public/assets'
    let filePath = this.file.applicationDirectory + 'public/assets';
    console.log('filePath: "' + filePath + '"');

    // copy the file to a new file in the application data directory
    // on iOS this isn't needed, but on Android, the fileOpener plugin
    // cannot see into the application directory for some reason or
    // another
    let tempName = Date.now();
    let outName = tempName + '.pdf';
    try {
      await this.file.copyFile(filePath, fname, this.file.dataDirectory, outName).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf');
      });
    } catch (error) {
      console.log(error)
    }
  }

  async downloadOpenAFile(URL: string, destFileName: string) {
    console.log('Download of "' + URL + '" beginning. ' + Date.now() / 1000);
    try {
      const ret = await Http.downloadFile({
        url: URL,
        filePath: destFileName,
        fileDirectory: FilesystemDirectory.Data
      });
      if (ret.path) {
        console.log('Download completed to "' + ret.path + '". ' + Date.now() / 1000);

        try {
          let rslt = await Filesystem.stat({
            path: ret.path
          });
          console.log(rslt.uri);
          this.fileOpener.open(rslt.uri, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));

        } catch (error1) {
          console.log('Unable to stat file.... ' + error1);
        }
      }
    } catch (error) {
      console.log('Error downloading file.... ' + error);
    }
  }


}

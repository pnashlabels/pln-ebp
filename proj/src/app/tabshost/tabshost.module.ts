/*
Copyright 2020-2021 The State of Washington

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TabshostPage } from './tabshost.page';

const routes: Routes = [
  {
    path: 'tabshost',
    component: TabshostPage,
    children: [
      { path: 'tab-labels', loadChildren: '../tab-labels/tab-labels.module#TabLabelsPageModule' },
      //  { path: 'tab-search', loadChildren: '../tab-search/tab-search.module#TabSearchPageModule' },
      {
        path: 'tab-search',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule)
      },
      { path: 'tab-resources', loadChildren: '../tab-resources/tab-resources.module#TabResourcesPageModule' },
      { path: 'more', loadChildren: '../more/more.module#MorePageModule' },
      { path: '', redirectTo: '/tabshost/tab-labels', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/tabshost/tab-labels',
    pathMatch: 'full'
    // component: TabshostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabshostPage]
})
export class TabshostPageModule { }

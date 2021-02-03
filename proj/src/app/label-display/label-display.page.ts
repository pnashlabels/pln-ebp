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
import { Router } from '@angular/router';
import { LogsService } from '../services/logs.service';
import { OpenFilesService } from '../services/open-files.service';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.page.html',
  styleUrls: ['./label-display.page.scss'],
})

export class LabelDisplayPage implements OnInit {
  label: any = null;
  lg = '';
  lgTag = '';
  statics: any = null;
  static: any = null;
  copyright = '';
  showTranslate = true;

  classesHeading00: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent00: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading01: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent01: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading02: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent02: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading03: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent03: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading04: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent04: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading05: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent05: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading06: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent06: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading07: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent07: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading08: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent08: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading09: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent09: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  classesHeading10: any = { 'collapsible-heading': true, 'collapsible-heading-open': false, 'collapsible-heading-closed': true }
  classesContent10: any = { 'collapsible-content': true, 'collapsed': true, 'expanded': false }

  // hdgs
  hdg00 = '';

  // heading 00 -- product information
  productName = '';
  epaRegNo = '';
  classes = '';
  measures = '';
  formulation = '';
  signalWordBox = '';
  signalWord = '';
  restricted = '';
  agUseRequirements = '';
  directionsForUse = '';
  activeWeightByVol = '';
  trademark = '';
  ingTable = false;
  activeIngrs: any[] = [];
  otherIngrs: any[] = [];
  sumIngrs = 0;
  ingrsTotalText = '';
  petroleumDistillates: any[] = [];
  pdTable = false;
  pctColHdg = '';

  // heading 01
  producerAddress = '';
  producerPhone = '';
  producerWebsite = '';
  producerURL = '';

  // heading 02
  firstAidEmergencies = '';
  firstAidSwallow = '';
  firstAidInEyes = '';
  firstAidSkin = '';
  firstAidInhaled = '';
  firstAidPhysician = '';
  firstAidCallCenter = '';
  firstAidEmergPhone = '';

  // heading 03
  rei = '';
  phi = '';
  hazardStatement = '';
  safetyRecommendations = '';

  // heading 04
  agUseReentryFull = '';
  ppeEquip = '';

  // heading 05
  engControls = '';

  // heading 06
  physHazards = '';

  // heading 07
  storageDisposal = '';

  // heading 08
  envHazards = '';

  // heading 09
  sprayDrift = '';

  // heading 10
  picolLink = '';
  picolSupplements = '';
  supps: any[] = [];

  // trademark
  trademarkStatic = '';

  private readonly pageName = 'HS Label';

  logCategoryOpen(cat: number) {
    const catStrings = [
      'Product Information',
      'Producer Information',
      'First Aid',
      'Health and Safety',
      'PPE',
      'Engineering Controls',
      'Physical or Chemical Hazards',
      'Storage and Disposal',
      'Environmental Protection',
      'Spray Drift Prevention',
      'Pesticide Labels'
    ];
    this.logs.logInfo('evCategoryOpen', 'HSLabel', this.label.productName + ' | epa: ' + this.label.epaReg, 'Category: ' +  catStrings[cat]);
  }

  sectClick00() {
    this.classesHeading00['collapsible-heading-open'] = !this.classesHeading00['collapsible-heading-open'];
    this.classesHeading00['collapsible-heading-closed'] = !this.classesHeading00['collapsible-heading-closed'];
    this.classesContent00['collapsed'] = !this.classesContent00['collapsed'];
    this.classesContent00['expanded'] = !this.classesContent00['expanded'];
    if (this.classesContent00['expanded']) {
      this.logCategoryOpen(0);
    }
  }

  sectClick01() {
    this.classesHeading01['collapsible-heading-open'] = !this.classesHeading01['collapsible-heading-open'];
    this.classesHeading01['collapsible-heading-closed'] = !this.classesHeading01['collapsible-heading-closed'];
    this.classesContent01['collapsed'] = !this.classesContent01['collapsed'];
    this.classesContent01['expanded'] = !this.classesContent01['expanded'];
    if (this.classesContent01['expanded']) {
      this.logCategoryOpen(1);
    }
  }

  sectClick02() {
    this.classesHeading02['collapsible-heading-open'] = !this.classesHeading02['collapsible-heading-open'];
    this.classesHeading02['collapsible-heading-closed'] = !this.classesHeading02['collapsible-heading-closed'];
    this.classesContent02['collapsed'] = !this.classesContent02['collapsed'];
    this.classesContent02['expanded'] = !this.classesContent02['expanded'];
    if (this.classesContent02['expanded']) {
      this.logCategoryOpen(2);
    }
  }

  sectClick03() {
    this.classesHeading03['collapsible-heading-open'] = !this.classesHeading03['collapsible-heading-open'];
    this.classesHeading03['collapsible-heading-closed'] = !this.classesHeading03['collapsible-heading-closed'];
    this.classesContent03['collapsed'] = !this.classesContent03['collapsed'];
    this.classesContent03['expanded'] = !this.classesContent03['expanded'];
    if (this.classesContent03['expanded']) {
      this.logCategoryOpen(3);
    }
  }

  sectClick04() {
    this.classesHeading04['collapsible-heading-open'] = !this.classesHeading04['collapsible-heading-open'];
    this.classesHeading04['collapsible-heading-closed'] = !this.classesHeading04['collapsible-heading-closed'];
    this.classesContent04['collapsed'] = !this.classesContent04['collapsed'];
    this.classesContent04['expanded'] = !this.classesContent04['expanded'];
    if (this.classesContent04['expanded']) {
      this.logCategoryOpen(4);
    }
  }

  sectClick05() {
    this.classesHeading05['collapsible-heading-open'] = !this.classesHeading05['collapsible-heading-open'];
    this.classesHeading05['collapsible-heading-closed'] = !this.classesHeading05['collapsible-heading-closed'];
    this.classesContent05['collapsed'] = !this.classesContent05['collapsed'];
    this.classesContent05['expanded'] = !this.classesContent05['expanded'];
    if (this.classesContent05['expanded']) {
      this.logCategoryOpen(5);
    }
  }

  sectClick06() {
    this.classesHeading06['collapsible-heading-open'] = !this.classesHeading06['collapsible-heading-open'];
    this.classesHeading06['collapsible-heading-closed'] = !this.classesHeading06['collapsible-heading-closed'];
    this.classesContent06['collapsed'] = !this.classesContent06['collapsed'];
    this.classesContent06['expanded'] = !this.classesContent06['expanded'];
    if (this.classesContent06['expanded']) {
      this.logCategoryOpen(6);
    }
  }

  sectClick07() {
    this.classesHeading07['collapsible-heading-open'] = !this.classesHeading07['collapsible-heading-open'];
    this.classesHeading07['collapsible-heading-closed'] = !this.classesHeading07['collapsible-heading-closed'];
    this.classesContent07['collapsed'] = !this.classesContent07['collapsed'];
    this.classesContent07['expanded'] = !this.classesContent07['expanded'];
    if (this.classesContent07['expanded']) {
      this.logCategoryOpen(7);
    }
  }

  sectClick08() {
    this.classesHeading08['collapsible-heading-open'] = !this.classesHeading08['collapsible-heading-open'];
    this.classesHeading08['collapsible-heading-closed'] = !this.classesHeading08['collapsible-heading-closed'];
    this.classesContent08['collapsed'] = !this.classesContent08['collapsed'];
    this.classesContent08['expanded'] = !this.classesContent08['expanded'];
    if (this.classesContent08['expanded']) {
      this.logCategoryOpen(8);
    }
  }

  sectClick09() {
    this.classesHeading09['collapsible-heading-open'] = !this.classesHeading09['collapsible-heading-open'];
    this.classesHeading09['collapsible-heading-closed'] = !this.classesHeading09['collapsible-heading-closed'];
    this.classesContent09['collapsed'] = !this.classesContent09['collapsed'];
    this.classesContent09['expanded'] = !this.classesContent09['expanded'];
    if (this.classesContent09['expanded']) {
      this.logCategoryOpen(9);
    }
  }

  sectClick10() {
    this.classesHeading10['collapsible-heading-open'] = !this.classesHeading10['collapsible-heading-open'];
    this.classesHeading10['collapsible-heading-closed'] = !this.classesHeading10['collapsible-heading-closed'];
    this.classesContent10['collapsed'] = !this.classesContent10['collapsed'];
    this.classesContent10['expanded'] = !this.classesContent10['expanded'];
    if (this.classesContent10['expanded']) {
      this.logCategoryOpen(10);
    }
  }

  constructor(
    public staticService: StaticTextService,
    public theData: DataService,
    private navController: NavController,
    private router: Router,
    private logs: LogsService,
    private openFile: OpenFilesService
  ) { }

  goBack() {
    this.navController.navigateBack('tabshost/tab-labels');
    // this.router.navigate(['/tab-labels']);  
  }

  ngOnInit() {
    this.statics = this.staticService.getStaticText();
    this.label = this.theData.getCurrLabel();
    this.copyright = this.theData.getCopyright();

    this.lg = this.theData.getLang();
    if (this.lg == 'es') {
      this.lgTag = 'ESP';
    } else {
      this.lgTag = 'ENG';
    }
    this.loadLabel(this.lgTag);
  }

  ionViewDidEnter() {
    this.lg = this.theData.getLang();
    let desc3 = this.label.productName + ' | epa: ' + this.label.epaReg;
    this.logs.logInfo('evViewPage', this.pageName, this.lg, desc3);
  }

  labelDownload() {
    this.logDownload();
    let url = this.picolLink;
    let destFname = Date.now() + '.pdf';
    this.openFile.downloadOpenAFile(url, destFname);
  }

  logDownload() {
    this.logs.logInfo('evDownloadLabel', this.label.epaReg, this.label.productName, 'H&S');
  }

  suppDownload(n: number) {
    console.log(n);
    this.logSuppDownload();
    let supp = this.supps[n];
    let url = supp.link;
    let destFname = Date.now() + '.pdf';
    this.openFile.downloadOpenAFile(url, destFname);
  }

  logSuppDownload() {
    this.logs.logInfo('evDownloadLabel', this.label.epaReg, this.label.productName, 'H&S Supplement');

  }

  loadStatics() {
    this.static = this.statics[this.lg].label;
  }

  genLinkURL(link) {
    link = link.trim();
    if(link != '--') {
      if(link.search('//') < 0) {
        link = 'http://' + link;
      }
    }
    return link;
  }

  loadLabel(tag) {
    this.loadStatics();
    // heading 00 -- product information
    this.signalWord = this.cleanSignalWord(this.label.signalWord, tag);
    this.classes = this.createSemicolonLine(this.label.classes, tag);
    this.classes = this.replaceEmptyWithDashes(this.classes);
    this.measures = this.createSemicolonLine(this.label.measures, tag);
    this.formulation = this.replaceEmptyWithDashes(this.label.formulation[tag]);
    this.restricted = this.label.restricted;
    this.agUseRequirements = this.processSingleTextField(this.label.agUseRequirements, tag);
    this.agUseRequirements = this.replaceEmptyWithDashes(this.agUseRequirements);
    this.directionsForUse = this.processSingleTextField(this.label.directions, tag);
    this.directionsForUse = this.replaceEmptyWithDashes(this.directionsForUse);
    this.activeWeightByVol = this.processSingleTextField(this.label.activeWeightByVol, tag);
    this.activeWeightByVol = this.replaceEmptyWithDashes(this.activeWeightByVol);
    this.trademark = this.processSingleTextField(this.label.trademark, tag);
    this.processIngredients(this.label, tag);
    this.processPetroleumDistillates(this.label, tag);
    this.pctColHdg = this.label.ingrColPctHeading[tag];
    if ((this.pctColHdg == '') || (this.pctColHdg == '--')) {
      this.pctColHdg = '%';
    }

    // heading 01 -- producer information
    this.producerAddress = this.replaceEmptyWithDashes(this.label.producerAddress);
    this.producerPhone = this.processSingleTextField(this.label.producerPhone, tag);
    this.producerWebsite = this.replaceEmptyWithDashes(this.label.producerWebsite);
    this.producerURL = this.genLinkURL(this.producerWebsite);

    // heading 02 -- first aid information
    this.firstAidEmergencies = this.replaceNLwithBR(this.static.firstAidEmergencies);
    this.firstAidSwallow = this.processSingleTextField(this.label.firstAidSwallow, tag);
    this.firstAidInEyes = this.processSingleTextField(this.label.firstAidEyes, tag);
    this.firstAidSkin = this.processSingleTextField(this.label.firstAidSkin, tag);
    this.firstAidInhaled = this.processSingleTextField(this.label.firstAidInhaled, tag);
    this.firstAidPhysician = this.processSingleTextField(this.label.firstAidPhysician, tag);
    this.firstAidCallCenter = this.processSingleTextField(this.label.firstAidCallCenter, tag);
    this.firstAidEmergPhone = this.processSingleTextField(this.label.emergPhone, tag);

    // heading 03 -- health and safety information
    this.rei = this.createSemicolonLine(this.label.rei, tag);
    this.phi = this.createSemicolonLine(this.label.phi, tag);
    this.hazardStatement = this.processSingleTextField(this.label.hazardStatement, tag);
    this.safetyRecommendations = this.processSingleTextField(this.label.safetyRecommendations, tag);

    // heading 04 -- PPE information
    this.agUseReentryFull = this.processSingleTextField(this.label.agUseReentryFull, tag);
    this.ppeEquip = this.processSingleTextField(this.label.ppeEquip, tag);

    // heading 05 -- engineering controls
    this.engControls = this.processSingleTextField(this.label.engControls, tag);

    // heading 06 -- physical or chemical hazards
    this.physHazards = this.processSingleTextField(this.label.physHazards, tag);

    // heading 07 -- storage and disposal
    this.storageDisposal = this.processSingleTextField(this.label.storageDisposal, tag);

    // heading 08 -- environmental hazards
    this.envHazards = this.processSingleTextField(this.label.envHazards, tag);

    // heading 09 -- spray drift prevention
    this.sprayDrift = this.processSingleTextField(this.label.sprayDrift, tag);

    // heading 10 -- pesticide labels
    this.picolLink = this.replaceEmptyWithDashes(this.label.picolLabelLink);
    this.picolSupplements = this.getSupplementLabels(this.label.picolSupplements);

    // trademark static
    this.trademarkStatic = this.statics[this.lg].fineprint.trademark;
  }

  stripPct(str: string) {
    let s = '';
    var pos = str.indexOf('%');
    if (pos > 0) {
      s = str.slice(0, pos);
    } else {
      s = str;
    }
    s = s.trim();
    if (s == "") {
      s = "0";
    }
    return s;
  }

  getIngredientName(a, tag, i) {
    let itm = a[i];
    let name = itm[tag];
    name = name.trim();
    let nameEng = itm['ENG'];
    nameEng = nameEng.trim();
    name = this.replaceEmptyWithDashes(name);
    nameEng = this.replaceEmptyWithDashes(nameEng);
    if (tag != 'ENG') {
      if ((name == '--') && (nameEng != '--')) {
        name = '[' + nameEng + ']';
      }
    }
    return name;
  }

  processIngredients(label, tag) {
    this.ingTable = false;
    this.sumIngrs = 0;
    this.activeIngrs.length = 0;
    for (let i = 0; i < label.activeIngredients.length; i++) {
      let itm = label.activeIngredients[i];
      if (typeof (itm) != 'undefined') {
        let pct = this.stripPct(itm.pct);
        let n = Number(pct);
        this.sumIngrs += n;
        // let name = itm[tag];
        // name = this.replaceEmptyWithDashes(name);
        let name = this.getIngredientName(label.activeIngredients, tag, i);
        this.activeIngrs.push({ 'name': name, 'pct': n.toFixed(2) });
        this.ingTable = true;
      }
    }

    this.otherIngrs.length = 0;
    for (let i = 0; i < label.inactiveIngredients.length; i++) {
      let itm = label.inactiveIngredients[i];
      if (typeof (itm) != 'undefined') {
        let pct = this.stripPct(itm.pct);
        let n = Number(pct);
        this.sumIngrs += n;
        // let name = itm[tag];
        // name = this.replaceEmptyWithDashes(name);
        let name = this.getIngredientName(label.inactiveIngredients, tag, i);
        this.otherIngrs.push({ 'name': name, 'pct': n.toFixed(2) });
        this.ingTable = true;
      }
    }
    this.ingrsTotalText = this.sumIngrs.toFixed(2) + '%';
  }

  processPetroleumDistillates(label, tag) {
    this.petroleumDistillates.length = 0;
    this.pdTable = false;
    if (typeof (label.petroleumDistillates) != 'undefined') {
      for (let i = 0; i < label.petroleumDistillates.length; i++) {
        let itm = this.label.petroleumDistillates[i];
        if (typeof (itm) != 'undefined') {
          let pct = this.stripPct(itm.pct);
          let n = Number(pct);
          // let name = itm[tag];
          let name = this.getIngredientName(label.petroleumDistillates, tag, i);
          if ((itm.name != '--') && (itm.name != '') && (n != 0)) {
            this.pdTable = true;
          }
          this.petroleumDistillates.push({ 'name': name, 'pct': n.toFixed(2) })
        }
      }
    }
  }

  replaceDashesWithEmpty(txt) {
    txt = txt.trim();
    if ((typeof (txt) == 'undefined') || (txt == '--')) {
      txt = ''
    }
    return txt;
  }

  cleanSignalWord(itm, tag) {
    let wrd = itm["ENG"];
    wrd = wrd.toUpperCase();
    if (wrd.indexOf('POISON') > -1) {
      wrd = 'POISON';
    } else if (wrd.indexOf('DANGER') > -1) {
      wrd = 'DANGER';
    } else if (wrd.indexOf('WARNING') > -1) {
      wrd = 'WARNING';
    } else if (wrd.indexOf('CAUTION') > -1) {
      wrd = 'CAUTION';
    } else {
      wrd = 'UNKNOWN';
    }
    return wrd;
  }

  getFileNameFromURL(path: string) {
    if(path.length > 1) {
      let pos = path.lastIndexOf('/');
      if(pos > 0) {
        path = path.slice(pos + 1);
      }
    }
    return path;
  }

  getSupplementLabels(supplements) {
    let html = '';
    this.supps = [];
    if ((typeof (supplements) == 'undefined') || (supplements.length == 0)) {
      html = '<span class="content-normal">--</span><br>';
    } else {
      for (var i = 0; i < supplements.length; i++) {
        let supp = supplements[i];
        // let line = '<span class="content-normal"><a href="' + supp.suppLink + '">' + supp.suppLink + '</a></span><br>';
        // html += line;
        let lbl = this.getFileNameFromURL(supp.suppLink);
        this.supps.push({'link': supp.suppLink, 'label': lbl});
      }
    }
    return html;
  }

  processSingleTextField(itm, tag) {
    let value = itm[tag];
    value = value.trim();
    let engValue = itm['ENG'];
    engValue = engValue.trim();

    if ((engValue == '') || (engValue == '--')) {
      value = '--';
    }

    if ((value == '') && (tag != 'ENG')) {
      value = '[' + engValue + ']';
    }

    return this.replaceNLwithBR(value);
  }

  switchLanguage() {
    this.lg = this.theData.lg;
    let oldlg = this.lg;
    if (oldlg == 'en') {
      this.lg = 'es';
      this.lgTag = 'ESP';
    } else {
      this.lg = 'en';
      this.lgTag = 'ENG';
    }
    this.logs.logInfo('evLanguageToggle', this.pageName, oldlg + '=>' + this.lg, '');
    this.theData.setLang(this.lg);
    this.loadLabel(this.lgTag);
  }

  /* 
  General purpose utility functions for DB field processing below
   */
  replaceNLwithBR(str) {
    return str.replace(/\n/g, '<br>');
  }

  preProcessField(txt) {
    let output = '';
    txt = txt.trim();
    if (typeof (txt) != 'undefined') {
      output = txt;
    }
    if (output == "") {
      output = "--";
    }
    output = this.replaceNLwithBR(output);
    return output;
  }

  addSemicolon(txt, i) {
    if (i > 0) {
      txt += '; ';
    }
    return txt;
  }

  replaceEmptyValue(itm, lg, i) {
    let value = itm[lg];
    value = value.trim();
    if ((i == 0) && (value == "")) {
      value = '--';
    } else if ((lg != "ENG") && (value == "")) {
      value = itm["ENG"];
      value = value.trim();
      value = '[' + value + ']';
    }
    return value;
  }

  createSemicolonLine(a, lg) {
    let txt = '';
    if ((typeof (a) != 'undefined') && (a.length > 0)) {
      for (let i = 0; i < a.length; i++) {
        let itm = a[i];
        let value = this.replaceEmptyValue(itm, lg, i);
        txt = this.addSemicolon(txt, i);
        txt += value;
      }
    }
    return txt;
  }

  replaceEmptyWithDashes(txt) {
    txt = txt.trim();
    if (txt == '') {
      txt = '--';
    }
    return txt;
  }

}

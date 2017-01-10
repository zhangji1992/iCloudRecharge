import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {AdSlide} from './components/public/ad-slide/ad-slide';
import {AdDetail} from './components/private/ad-detail/ad-detail';
import {Ad} from './providers/ad';
import {AdRequest} from "./providers/ad-request";
import {AdLayout1} from "./components/private/ad-layout-1/ad-layout-1";
import {AdLayout2} from "./components/private/ad-layout-2/ad-layout-2";
import {AdGroupList} from "./components/public/ad-group-list/ad-group-list";
import {imageUtilService} from "./providers/image-util.service";
import {Storage} from '@ionic/storage'
import {AdFileService} from "./providers/ad-file.service";

@NgModule({
    imports: [IonicModule],
    declarations: [
        AdSlide,
        AdDetail,
        AdLayout1,
        AdLayout2,
        AdGroupList
    ],
    entryComponents: [AdSlide, AdDetail],
    exports: [
        AdSlide,
        AdGroupList
    ],
    providers: [Ad, AdRequest, imageUtilService, Storage, AdFileService]
})

export class AdModule {
}


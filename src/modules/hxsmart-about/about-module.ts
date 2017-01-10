import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {LatestVersionInfo} from './components/latest-version-info/latest-version-info';
import {Feedback} from './components/feedback/feedback';
import {AboutService} from "./providers/aboutService";
import {AboutApp} from "./components/about-app/about-app";

@NgModule({
    imports: [IonicModule],
    declarations: [AboutApp, LatestVersionInfo, Feedback],
    entryComponents: [AboutApp, LatestVersionInfo, Feedback],
    exports: [AboutApp, LatestVersionInfo, Feedback],
    providers: [AboutService]
})
export class AboutModule {
}

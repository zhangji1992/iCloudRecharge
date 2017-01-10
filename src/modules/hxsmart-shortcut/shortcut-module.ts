import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ShortcutSlide} from './components/public/shortcut-slide/shortcut-slide';
import {ShortcutDetail} from './components/private/shortcut-detail/shortcut-detail';
import {Shortcut} from './providers/shortcut';
import {ImgSrcDirective} from "./directive/img-src.directive";
import {CompusCardModule} from "../hxsmart-compus-card/compus-card-module";
import {GasCardModule} from "../hxsmart-gas-card/gas-card-module";
import {ETCCardModule} from "../hxsmart-etc/etc-card-module";
import {AboutModule} from "../hxsmart-about/about-module";
import {UserModule} from "../hxsmart-user/user-module";
import {FieldCardModule} from "../hxsmart-field-card/hxsmart-field-card-module";
import {PayAccountModule} from "../hxsmart-pay-account/hxsmart-pay-account-module";

@NgModule({
    imports: [IonicModule, CompusCardModule, GasCardModule, ETCCardModule, UserModule, AboutModule, FieldCardModule, PayAccountModule],
    declarations: [ShortcutSlide, ShortcutDetail, ImgSrcDirective],
    entryComponents: [ShortcutSlide, ShortcutDetail],
    exports: [ShortcutSlide],
    providers: [Shortcut]
})

export class ShortcutModule {
}

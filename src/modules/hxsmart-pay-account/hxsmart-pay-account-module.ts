import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {PayAccountList} from "./components/pay-account-list/pay-account-list";
import {CGB2AccountModule} from "../hxsmart-CGB-2account/hxsmart-CGB-2account-module";

import {PayAccount} from "./providers/pay-account";

@NgModule({
    imports: [IonicModule, CGB2AccountModule],
    declarations: [PayAccountList],
    entryComponents: [PayAccountList],
    exports: [PayAccountList],
    providers: [PayAccount]
})

export class PayAccountModule {
}

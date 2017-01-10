import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {FieldCardList} from "./components/field-card-list/field-card-list";
import {FieldCard} from "./providers/field-card";
import {CompusCardModule} from "../hxsmart-compus-card/compus-card-module";
import {GasCardModule} from "../hxsmart-gas-card/gas-card-module";
import {ETCCardModule} from "../hxsmart-etc/etc-card-module";

@NgModule({
    imports: [IonicModule, CompusCardModule, GasCardModule, ETCCardModule],
    declarations: [FieldCardList],
    entryComponents: [FieldCardList],
    exports: [FieldCardList],
    providers: [FieldCard]
})

export class FieldCardModule {
}

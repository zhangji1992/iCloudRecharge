import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {GasCard} from './providers/gas-card';
import {UserModule} from '../hxsmart-user/user-module';
import {GasCardRequest} from './providers/gas-card-request';
import {GasCardList} from './components/gas-card-list/gas-card-list';
import {GasCardChargeDetail} from './components/gas-card-charge-detail/gas-card-charge-detail';
import {GasCardChargeComponent} from './components/gas-card-charge/gas-card-charge';
import {GasCardCharge1Component} from './components/gas-card-charge1/gas-card-charge1';
import {GasCardCharge2Component} from './components/gas-card-charge2/gas-card-charge2';
import {ToolModule} from '../hxsmart-tool/tool-module';
import {CGB2AccountModule} from '../hxsmart-CGB-2account/hxsmart-CGB-2account-module';
import {GasCardPaylist} from './components/gas-card-paylist/gas-card-paylist';
import {GasCardEasyList} from './components/gas-card-easy-list/gas-card-easy-list';
import {GasCardDetail} from './components/gas-card-detail/gas-card-detail';
import {GasCardAdd} from './components/gas-card-add/gas-card-add';
import {GasCardAdd1Component} from './components/gas-card-add1/gas-card-add1';
import {GasCardAdd2Component} from './components/gas-card-add2/gas-card-add2';
import {GasSelectComponent} from './components/gas-select/gas-select';

@NgModule({
    imports: [IonicModule, ToolModule, CGB2AccountModule, UserModule],
    declarations: [
        GasCardList, GasCardChargeDetail, GasCardChargeComponent, GasCardPaylist, GasCardCharge1Component,
        GasCardCharge2Component, GasCardEasyList, GasCardDetail, GasCardAdd, GasSelectComponent,
        GasCardAdd1Component, GasCardAdd2Component
    ],
    entryComponents: [
        GasCardList, GasCardChargeDetail, GasCardChargeComponent, GasCardCharge1Component, GasCardCharge2Component,
        GasCardEasyList, GasCardDetail, GasCardAdd, GasSelectComponent, GasCardAdd1Component, GasCardAdd2Component],
    exports: [GasCardEasyList],
    providers: [GasCard, GasCardRequest]
})

export class GasCardModule {
}



import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ToolModule} from '../hxsmart-tool/tool-module';
import {UserModule} from '../hxsmart-user/user-module';
import {CGB2AccountModule} from '../hxsmart-CGB-2account/hxsmart-CGB-2account-module';
import {CompusCard} from './providers/compus-card';
import {CompusCardInterface} from './providers/compus-card-interface';
import {CompusCardRequest} from './providers/compus-card-request';
import {CompusCardComponent} from './components/compus-card/compus-card';
import {CompusCardAddComponent} from './components/compus-card-add/compus-card-add';
import {CompusCardAdd1Component} from './components/compus-card-add1/compus-card-add1';
import {CompusCardAdd2Component} from './components/compus-card-add2/compus-card-add2';
import {CompusCardChargeComponent} from './components/compus-card-charge/compus-card-charge';
import {CompusCardCharge1Component} from './components/compus-card-charge1/compus-card-charge1';
import {CompusCardCharge2Component} from './components/compus-card-charge2/compus-card-charge2';
import {CompusSelectComponent} from './components/compus-select/compus-select';
import {CompusCardEasyList} from './components/private/compus-card-easy-list/compus-card-easy-list';
import {CompusCardDetail} from './components/private/compus-card-detail/compus-card-detail';
import {CompusCardList} from './components/private/compus-card-list/compus-card-list';
import {CompusCardChargeDetail} from './components/private/compus-card-charge-detail/compus-card-charge-detail';
import {CompusCardConsumeDetail} from './components/private/compus-card-consume-detail/compus-card-consume-detail';
import {CompusCardPaylistComponent} from './components/compus-card-paylist/compus-card-paylist';
import {CompusCourseComponent} from './components/compusService/compus-course/compus-course';
import {CompusMarkComponent} from './components/compusService/compus-mark/compus-mark';
import {CompusPaymentComponent} from './components/compusService/compus-payment/compus-payment';
import {CompusRecordComponent} from './components/compusService/compus-record/compus-record';


@NgModule({
    imports: [IonicModule, ToolModule, UserModule, CGB2AccountModule],
    declarations: [
        CompusCardComponent, CompusSelectComponent, CompusCardPaylistComponent,
        CompusCardAddComponent, CompusCardAdd1Component, CompusCardAdd2Component,
        CompusCardChargeComponent, CompusCardCharge1Component, CompusCardCharge2Component,
        CompusCardEasyList, CompusCardDetail, CompusCardList, CompusCardChargeDetail, CompusCardConsumeDetail,
        CompusCourseComponent, CompusMarkComponent, CompusPaymentComponent, CompusRecordComponent
    ],
    entryComponents: [
        CompusCardComponent, CompusSelectComponent, CompusCardPaylistComponent,
        CompusCardAddComponent, CompusCardAdd1Component, CompusCardAdd2Component,
        CompusCardChargeComponent, CompusCardCharge1Component, CompusCardCharge2Component,
        CompusCardEasyList, CompusCardList, CompusCardDetail, CompusCardChargeDetail, CompusCardConsumeDetail,
        CompusCourseComponent, CompusMarkComponent, CompusPaymentComponent, CompusRecordComponent
    ],
    exports: [
        CompusCardComponent, CompusSelectComponent, CompusCardPaylistComponent,
        CompusCardAddComponent, CompusCardAdd1Component, CompusCardAdd2Component,
        CompusCardChargeComponent, CompusCardCharge1Component, CompusCardCharge2Component,
        CompusCardEasyList, CompusCardDetail, CompusCardChargeDetail, CompusCardConsumeDetail,
        CompusCourseComponent, CompusMarkComponent, CompusPaymentComponent, CompusRecordComponent
    ],
    providers: [CompusCard, CompusCardInterface, CompusCardRequest]
})
export class CompusCardModule {
}

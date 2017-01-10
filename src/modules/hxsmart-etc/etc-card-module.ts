import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {EtcCardListComponent} from "./components/etc-card-list/etc-card-list";
import {EtcCardAddComponent} from "./components/etc-card-add/etc-card-add";
import {EtcCard} from "./providers/etc-card";
import {EtcCardRequest} from "./providers/etc-card-request";
import {EtcCardDetailComponent} from "./components/etc-card-detail/etc-card-detail";
import {EtcCardRechargeComponent} from "./components/etc-card-recharge/etc-card-recharge";
import {EtcCardRechargeRecordComponent} from "./components/etc-card-recharge-record/etc-card-recharge-record";
import {EtcCardSimpleListComponent} from "./components/etc-card-simple-list/etc-card-simple-list";
import {ToolModule} from "../hxsmart-tool/tool-module";
import {UserModule} from "../hxsmart-user/user-module";
import {EtcCardRechargeAnimateComponent} from "./components/etc-card-recharge-animate/etc-card-recharge-animate";
import {CGB2AccountModule} from "../hxsmart-CGB-2account/hxsmart-CGB-2account-module";
import {EtcRechargePayChannelListComponent} from "./components/etc-card-recharge-pay-channel-list/etc-card-recharge-pay-channel-list";

@NgModule({
    imports: [
        IonicModule,
        ToolModule,
        UserModule,
        CGB2AccountModule
    ],
    declarations: [
        EtcCardListComponent,
        EtcCardAddComponent,
        EtcCardDetailComponent,
        EtcCardRechargeComponent,
        EtcCardRechargeRecordComponent,
        EtcRechargePayChannelListComponent,
        EtcCardSimpleListComponent,
        EtcCardRechargeAnimateComponent
    ],
    entryComponents: [
        EtcCardListComponent,
        EtcCardAddComponent,
        EtcCardDetailComponent,
        EtcCardRechargeComponent,
        EtcCardRechargeRecordComponent,
        EtcRechargePayChannelListComponent,
        EtcCardSimpleListComponent
    ],
    exports: [
        EtcCardListComponent,
        EtcCardAddComponent,
        EtcCardDetailComponent,
        EtcCardRechargeComponent,
        EtcCardRechargeRecordComponent,
        EtcCardSimpleListComponent
    ],
    providers: [
        EtcCard,
        EtcCardRequest
    ]
})
export class ETCCardModule {
}

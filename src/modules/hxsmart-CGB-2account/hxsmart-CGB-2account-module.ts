import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {CGB2AccountList} from "./components/CGB-2account-list/CGB-2account-list";
import {CGB2accountRecharge} from "./components/CGB-2account-recharge/CGB-2account-recharge";
import {CGB2accountRechargeDetail} from "./components/CGB-2account-recharge-detail/CGB-2account-recharge-detail";
import {CGB2accountRechargeSuccess} from "./components/CGB-2account-recharge-success/CGB-2account-recharge-success";
import {CGB2accountCash} from "./components/CGB-2account-cash/CGB-2account-cash";
import {recharge} from "./components/recharge/recharge";
import {CGB2accountDetail} from "./components/CGB-2account-detail/CGB-2account-detail";
import {cash} from "./components/cash/cash";
import {CGB2accountCashDetail} from "./components/CGB-2account-cash-detail/CGB-2account-cash-detail";
import {CGB2accountCashSuccess} from "./components/CGB-2account-cash-success/CGB-2account-cash-success";
import {AccountMock} from "./mock/account-mock";
import {CGB2Account} from "./providers/CGB-2account";
import {AccountRequest} from "./providers/CGB-2account-request";
import {AccountInterface} from "./providers/CGB-2account-interface";
import {CGB2accountBankcardChange} from "./components/CGB-2account-bankcard-change/CGB-2account-bankcard-change";
import {CGB2accountBankcardChangeSuccess} from "./components/CGB-2account-bankcard-change-success/CGB-2account-bankcard-change-success";
import {CGB2accountBind} from "./components/CGB-2account-bind/CGB-2account-bind";
import {CGB2accountBindSuccess} from "./components/CGB-2account-bind-success/CGB-2account-bind-success";
import {TransBody, TransHeadBody, ShowFooter} from "./pipe/pipe";
import {UserModule} from "../hxsmart-user/user-module";
import {CGB2accountRealNameChecked} from "./components/CGB-2account-real-name-checked/CGB-2account-real-name-checked";
import {ToolModule} from "../hxsmart-tool/tool-module";
@NgModule({
    imports: [IonicModule, UserModule, ToolModule],
    declarations: [
        AccountMock,
        CGB2AccountList,
        CGB2accountRecharge,
        CGB2accountRechargeDetail,
        CGB2accountRechargeSuccess,
        recharge,
        CGB2accountCash,
        cash,
        CGB2accountCashDetail,
        CGB2accountCashSuccess,
        CGB2accountDetail,
        CGB2accountBankcardChange,
        CGB2accountBankcardChangeSuccess,
        CGB2accountBind,
        CGB2accountBindSuccess,
        TransBody,
        TransHeadBody,
        ShowFooter,
        CGB2accountRealNameChecked
    ],
    entryComponents: [
        AccountMock,
        CGB2AccountList,
        CGB2accountRecharge,
        CGB2accountRechargeDetail,
        CGB2accountRechargeSuccess,
        recharge,
        CGB2accountCash,
        cash,
        CGB2accountCashDetail,
        CGB2accountCashSuccess,
        CGB2accountDetail,
        CGB2accountBankcardChange,
        CGB2accountBankcardChangeSuccess,
        CGB2accountBind,
        CGB2accountBindSuccess,
        CGB2accountRealNameChecked
    ],
    exports: [
        AccountMock,
        CGB2AccountList,
        CGB2accountRecharge,
        recharge,
        CGB2accountCash,
        cash,
        CGB2accountBind,
        TransBody,
        TransHeadBody,
        ShowFooter
    ],
    providers: [CGB2Account, AccountRequest, AccountInterface]
})

export class CGB2AccountModule {
}

import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {User} from "./providers/user";
import {UserRequest} from "./providers/user-request";
import {UserVolidMobile} from "./components/user-volid-mobile/user-volid-mobile";
import {UserVolidEmail} from "./components/user-volid-email/user-volid-email";
import {AlertService} from "./providers/alert-service";
import {ToastService} from "./providers/toast-service";
import {UserBindMobile} from "./components/user-bind-mobile/user-bind-mobile";
import {UserBindEmail} from "./components/user-bind-email/user-bind-email";
import {UserStatus} from "./components/user-status/user-status";
import {UserCenter} from "./components/user-center/user-center";
import {UserCompleteProfile} from "./components/user-complete-profile/user-complete-profile";
import {UserLogin} from "./components/user-login/user-login";
import {UserRegister} from "./components/user-register/user-register";
import {UserSetPwd} from "./components/user-set-pwd/user-set-pwd";
import {UserCompleteRegister} from "./components/user-complete-register/user-complete-register";
import {UserSetPayPwd} from "./components/user-set-pay-pwd/user-set-pay-pwd";
import {UserModifyPwd} from "./components/user-modify-pwd/user-modify-pwd";
import {HideMobileNum} from "./pipes/hide-mobile-num";
import {UserResetPwdStep2} from "./components/user-reset-pwd/user-reset-pwd-step2/user-reset-pwd-step2";
import {UserResetPwdStep3} from "./components/user-reset-pwd/user-reset-pwd-step3/user-reset-pwd-step3";
import {UserResetPwdStep1Mobile} from "./components/user-reset-pwd/user-reset-pwd-step1/user-reset-pwd-step1-mobile/user-reset-pwd-step1-mobile";
import {UserResetPwdStep1Email} from "./components/user-reset-pwd/user-reset-pwd-step1/user-reset-pwd-step1-email/user-reset-pwd-step1-email";
import {MobileValidator} from "./pipes/mobile.validator";
import {ToolModule} from "../hxsmart-tool/tool-module";
import {TodoModule} from "../hxsmart-todo/todo-module";
import {UserModifyPayPwdStep1} from "./components/user-modify-pay-pwd/user-modify-pay-pwd-step1/user-modify-pay-pwd-step1";
import {UserModifyPayPwdStep2} from "./components/user-modify-pay-pwd/user-modify-pay-pwd-step2/user-modify-pay-pwd-step2";
import {LoadingService} from "./providers/loading-service";
@NgModule({
    imports: [IonicModule, ToolModule, TodoModule],
    declarations: [
        UserVolidMobile,
        UserVolidEmail,
        UserBindMobile,
        UserBindEmail,
        UserStatus,
        UserCenter,
        UserCompleteProfile,
        UserLogin,
        UserRegister,
        UserSetPwd,
        UserCompleteRegister,
        UserSetPayPwd,
        UserModifyPwd,
        HideMobileNum,
        UserResetPwdStep1Mobile,
        UserResetPwdStep1Email,
        UserResetPwdStep2,
        UserResetPwdStep3,
        MobileValidator,
        UserModifyPayPwdStep1,
        UserModifyPayPwdStep2
    ],
    entryComponents: [
        UserVolidMobile,
        UserVolidEmail,
        UserBindMobile,
        UserBindEmail,
        UserStatus,
        UserCenter,
        UserLogin,
        UserRegister,
        UserSetPwd,
        UserCompleteRegister,
        UserCompleteProfile,
        UserSetPayPwd,
        UserModifyPwd,
        UserResetPwdStep1Mobile,
        UserResetPwdStep1Email,
        UserResetPwdStep2,
        UserResetPwdStep3,
        UserModifyPayPwdStep1,
        UserModifyPayPwdStep2
    ],
    exports: [UserVolidMobile, UserVolidEmail, UserStatus, HideMobileNum],
    providers: [User, UserRequest, AlertService, ToastService, LoadingService]
})
export class UserModule {
}

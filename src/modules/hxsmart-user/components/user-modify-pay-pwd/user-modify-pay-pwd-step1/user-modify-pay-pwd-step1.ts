import {Component} from "@angular/core";
import {User} from "../../../providers/user";
import {UserModifyPayPwdStep2} from "../user-modify-pay-pwd-step2/user-modify-pay-pwd-step2";
import {NavController} from "ionic-angular";
@Component({
    selector: 'user-modify-pay-pwd-step1',
    templateUrl: 'user-modify-pay-pwd-step1.html'
})
export class UserModifyPayPwdStep1 {
    private verifyType: string;

    constructor(public userService: User,
                public navCtrl: NavController) {
        this.verifyType = "SetPayPwd";
    }

    confirmAfter(data) {
        console.log(data);
        this.navCtrl.push(UserModifyPayPwdStep2, {verifyCode: data.code});
    }
}

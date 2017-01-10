import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {User} from "../../../../providers/user";
import {UserResetPwdStep2} from "../../user-reset-pwd-step2/user-reset-pwd-step2";
import {UserResetPwdStep1Mobile} from "../user-reset-pwd-step1-mobile/user-reset-pwd-step1-mobile";
@Component({
    selector: 'user-reset-pwd-step1-email',
    templateUrl: 'user-reset-pwd-step1-email.html'
})
export class UserResetPwdStep1Email {
    private verifyType: string;
    private nextStr: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userService: User) {
    }

    ngOnInit(): void {
        this.verifyType = "ResetLoginPwd";
        this.nextStr = "other";
    }

    confirmAfter(data) {
        this.navCtrl.push(UserResetPwdStep2, {verifyWay: data.email, getWayBack: "Email", verifyCode: data.code});
    }

    changeWay(param) {
        this.navCtrl.push(UserResetPwdStep1Mobile);
    }

    goBack() {
        this.navCtrl.popToRoot();
    }
}

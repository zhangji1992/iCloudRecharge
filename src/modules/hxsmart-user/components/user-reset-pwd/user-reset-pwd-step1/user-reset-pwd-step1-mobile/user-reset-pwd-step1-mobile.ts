import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {User} from "../../../../providers/user";
import {UserResetPwdStep2} from "../../user-reset-pwd-step2/user-reset-pwd-step2";
import {UserResetPwdStep1Email} from "../user-reset-pwd-step1-email/user-reset-pwd-step1-email";
@Component({
    selector: 'user-reset-pwd-step1-mobile',
    templateUrl: 'user-reset-pwd-step1-mobile.html'
})
export class UserResetPwdStep1Mobile {
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
        this.navCtrl.push(UserResetPwdStep2, {verifyWay: data.phone, getWayBack: "MobilePhone", verifyCode: data.code});
    }

    changeWay(param) {
        this.navCtrl.push(UserResetPwdStep1Email);
    }

    goBack() {
        console.log("退出视图413131");
        this.navCtrl.popToRoot();
    }

    goNext() {
        this.navCtrl.push(UserResetPwdStep2);
    }
}

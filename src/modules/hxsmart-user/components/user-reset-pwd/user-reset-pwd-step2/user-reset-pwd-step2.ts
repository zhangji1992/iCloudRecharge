import {Component} from "@angular/core";
import {UserResetPwdStep3} from "../user-reset-pwd-step3/user-reset-pwd-step3";
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../../providers/user";
import {ToastService} from "../../../providers/toast-service";
import {AlertService} from "../../../providers/alert-service";
@Component({
    selector: 'user-reset-pwd-step2',
    templateUrl: 'user-reset-pwd-step2.html'
})
export class UserResetPwdStep2 {
    private newPwd: string;
    private reNewPwd: string;

    constructor(public userService: User,
                public navCtrl: NavController,
                public navParams: NavParams,
                public toast: ToastService,
                public alert: AlertService) {

    }

    resetPwd(): void {
        let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
        if (pwdReg.test(this.newPwd) && pwdReg.test(this.reNewPwd)) {
            if (this.newPwd == this.reNewPwd) {
                this.userService.resetPwd({
                    verifyWay: this.navParams.get("verifyWay"),
                    getWayBack: this.navParams.get("getWayBack"),
                    verifyCode: this.navParams.get("verifyCode"),
                    pwd: this.newPwd
                }).then(res => {
                    console.log("成功", res);
                    this.toast.presentToast({msg: "密码重置成功"});
                    this.navCtrl.push(UserResetPwdStep3);
                }, err => {
                    console.info("重置密码失败:", err);
                    this.alert.presentAlert({msg: err});
                });
            } else {
                this.alert.presentAlert({msg: "两次输入密码不一致!"})
            }
        } else {
            this.alert.presentAlert({msg: "密码为6-12位且是数字或字母"});
        }
    }
}

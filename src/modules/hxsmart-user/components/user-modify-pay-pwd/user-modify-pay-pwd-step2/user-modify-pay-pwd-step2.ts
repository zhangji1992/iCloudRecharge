import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ToastService} from "../../../providers/toast-service";
import {User} from "../../../providers/user";
import {UserCenter} from "../../user-center/user-center";

@Component({
    selector: 'user-modify-pay-pwd-step2',
    templateUrl: 'user-modify-pay-pwd-step2.html'
})

export class UserModifyPayPwdStep2 {
    private payPwd: string;//密码
    private rePayPwd: string;//确认密码
    private pwdFlag1 = "";//界面绑定密码变量
    private pwdFlag2 = "";//界面绑定确认密码变量

    constructor(private user: User,
                public navCtrl: NavController,
                public toastService: ToastService,
                public navParams: NavParams) {
    }

    //输入密码，调用密码键盘
    iptPayPwd(): void {
        if (this.pwdFlag1) {
            this.pwdFlag1 = "";
        }
        this.user.getInputPwd()
            .then(res => {
                console.log("成功:", typeof res);
                this.pwdFlag1 = "111111";
                this.payPwd = res + "";
            }, err => console.log(err));
    }

    //确认密码，调用密码键盘
    reIptPayPwd(): void {
        if (this.pwdFlag2) {
            this.pwdFlag2 = "";
        }
        this.user.getInputPwd()
            .then(res => {
                console.log("成功:", typeof res);
                this.pwdFlag2 = "111111";
                this.rePayPwd = res + "";
            }, err => console.log(err));
    }

    //完成修改密码，跳转到我的界面
    modify() {
        if (this.payPwd != this.rePayPwd) {
            this.toastService.presentToast({msg: '两次密码输入不一致！'});
        } else {
            this.user.resetPayPwd({
                payPwd: this.payPwd,
                verifyCode: this.navParams.get("verifyCode"),
                getBackWay: 'MobilePhone',
            }).then(res => {
                this.toastService.presentToast({msg: '支付密码重置成功！'});
                this.navCtrl.push(UserCenter);
            }, (err) => {
                this.toastService.presentToast({msg: err});
            });
        }
    }
}

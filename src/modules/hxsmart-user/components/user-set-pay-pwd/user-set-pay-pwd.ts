import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {User} from "../../providers/user";
import {ToastService} from "../../providers/toast-service";
import {Todo} from "../../../hxsmart-todo/providers/todo";
import {UserCenter} from "../user-center/user-center";
@Component({
    selector: 'user-set-pay-pwd',
    templateUrl: 'user-set-pay-pwd.html'
})

export class UserSetPayPwd {
    private payPwd = '';
    private rePayPwd = '';
    private pwdFlag1 = '';
    private pwdFlag2 = '';

    constructor(public navParams: NavParams,
                public userService: User,
                public todoService: Todo,
                public navCtrl: NavController,
                public toastService: ToastService) {
    }

    //输入支付密码，调用密码键盘
    iptPayPwd(): void {
        if (this.pwdFlag1) {
            this.pwdFlag1 = "";
        }
        this.userService.getInputPwd()
            .then(
                res => {
                    console.log("成功:", res);
                    this.pwdFlag1 = "111111";
                    this.payPwd = res + "";

                },
                err => console.log(err)
            );
    }

    //确认支付密码，调用密码键盘
    reIptPayPwd(): void {
        if (this.pwdFlag2) {
            this.pwdFlag2 = "";
        }
        this.userService.getInputPwd()
            .then(
                res => {
                    console.log("成功:", res);
                    this.pwdFlag2 = "111111";
                    this.rePayPwd = res + "";
                },
                err => console.log(err)
            );
    }

    setPayPwd() {
        console.log("设置支付密码:", this.payPwd, "==========", this.rePayPwd);
        if (this.payPwd != this.rePayPwd) {
            this.toastService.presentToast({msg: '两次密码输入不一致！'});
        } else {
            this.userService.setPayPwd({
                payPwd: this.payPwd
            }).then(res => {
                this.toastService.presentToast({msg: '支付密码设置成功！'});
                this.navCtrl.push(UserCenter);
            }, (err) => {
                this.toastService.presentToast({msg: err});
            });
        }
    }
}

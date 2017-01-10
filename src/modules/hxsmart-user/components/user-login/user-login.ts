import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {User} from "../../providers/user";
import {UserRegister} from "../user-register/user-register";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";
import {UserResetPwdStep1Mobile} from "../user-reset-pwd/user-reset-pwd-step1/user-reset-pwd-step1-mobile/user-reset-pwd-step1-mobile";

@Component({
    selector: 'user-login',
    templateUrl: 'user-login.html'
})
export class UserLogin {
    private userPhone: string;
    private userPwd: string;

    constructor(public navCtrl: NavController,
                public userService: User,
                public alertService: AlertService,
                public toastService: ToastService) {
    }

    goBack(): void {
        this.navCtrl.popToRoot();
    }

    //登录
    login(): void {
        let testReg = /^[1][34578][0-9]{9}$/;
        if (!testReg.test(this.userPhone)) {
            this.alertService.presentAlert({msg: '请输入正确的手机号码！'});
        } else {
            this.userService.login({
                phone: this.userPhone,
                pwd: this.userPwd
            }).then(res => {
                // this.toastService.presentToast({msg: '登录成功！'});
                this.userService.getUserInfo();//获取用户信息
                this.navCtrl.popToRoot();
            }, (err) => {
                this.toastService.presentToast({msg: err});
            });
        }
    }

    //注册
    register(): void {
        this.navCtrl.push(UserRegister);
    }

    //忘记密码，跳转至重置密码
    toResetPwd(): void {
        this.navCtrl.push(UserResetPwdStep1Mobile);
    }
}


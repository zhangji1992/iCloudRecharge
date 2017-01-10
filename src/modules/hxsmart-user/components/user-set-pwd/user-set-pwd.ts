import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../providers/user";
import {UserCompleteRegister} from "../user-complete-register/user-complete-register";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";

@Component({
    selector: 'user-set-pwd',
    templateUrl: 'user-set-pwd.html'
})
export class UserSetPwd {
    private userPwd = '';
    private userRePwd = '';

    constructor(public navCtrl: NavController,
                public userService: User,
                public navParams: NavParams,
                public alertService: AlertService,
                public toastService: ToastService) {
        console.log("user-set-pwd:", this.navParams.get('phone'), this.navParams.get("verifyCode"));
    }


    //注册
    register(): void {
        console.log(this.navParams.get('phone'));
        let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
        if (pwdReg.test(this.userPwd) && pwdReg.test(this.userRePwd)) {
            if (this.userPwd != this.userRePwd) {
                console.log("密码:", this.userPwd, this.userRePwd);
                this.alertService.presentAlert({msg: '两次密码输入不一致！'});
            } else {
                this.userService.register({
                    phone: this.navParams.get('phone'),
                    verifyCode: this.navParams.get("verifyCode"),
                    pwd: this.userPwd
                }).then(res => {
                    console.log("注册:", res);
                    // this.toastService.presentToast({msg: '注册成功！'});
                    this.navCtrl.push(UserCompleteRegister);
                }, (err) => {
                    this.toastService.presentToast({msg: err});
                });
            }
        } else {
            this.alertService.presentAlert({msg: "密码为6-12位且是数字或字母"});
        }
    }
}

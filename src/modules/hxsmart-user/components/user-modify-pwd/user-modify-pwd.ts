import {Component} from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {User} from "../../providers/user";
import {ToastService} from "../../providers/toast-service";
import {AlertService} from "../../providers/alert-service";
import {UserLogin} from "../user-login/user-login";
@Component({
    selector: 'user-modify-pwd',
    templateUrl: 'user-modify-pwd.html'
})
export class UserModifyPwd {
    private oldPwd = '';
    private newPwd = '';
    private reNewPwd = '';

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public userService: User,
                public toast: ToastService,
                public alert: AlertService,) {
    }

    //修改密码
    changePwd(): void {
        let pwdReg = /^[a-zA-Z0-9]{6,12}$/;
        if (!pwdReg.test(this.oldPwd)) {
            this.alert.presentAlert({msg: "原密码为6-12位且是数字或字母"});
        } else if (!pwdReg.test(this.newPwd) || !pwdReg.test(this.reNewPwd)) {
            this.alert.presentAlert({msg: "新密码密码为6-12位且是数字或字母"});
        } else if (this.newPwd == this.reNewPwd && this.newPwd != '') {
            this.userService.modifyPwd({
                "oldPwd": this.oldPwd,
                "newPwd": this.newPwd,
            }).then(res => {
                console.log("user-modify-pwd:", res);
                this.toast.presentToast({msg: "密码修改成功!"});
                this.userService.loginOut().then(res => {
                    this.navCtrl.push(UserLogin);
                });
            }, err => this.alert.presentAlert({msg: err}));
        } else {
            let alert = this.alertCtrl.create({
                title: "提示",
                message: "两次输入密码不一致",
                buttons: ["确定"]
            });
            alert.present();
            this.newPwd = '';
            this.reNewPwd = '';
        }
    }


}

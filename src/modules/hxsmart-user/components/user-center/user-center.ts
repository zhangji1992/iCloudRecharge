import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {User} from "../../providers/user";
import {UserCompleteProfile} from "../user-complete-profile/user-complete-profile";
import {UserBindMobile} from "../user-bind-mobile/user-bind-mobile";
import {AlertService} from "../../providers/alert-service";
import {UserSetPayPwd} from "../user-set-pay-pwd/user-set-pay-pwd";
import {UserModifyPwd} from "../user-modify-pwd/user-modify-pwd";
import {UserBindEmail} from "../user-bind-email/user-bind-email";
import {Todo} from "../../../hxsmart-todo/providers/todo";
import {UserModifyPayPwdStep1} from "../user-modify-pay-pwd/user-modify-pay-pwd-step1/user-modify-pay-pwd-step1";

@Component({
    selector: 'user-center',
    templateUrl: 'user-center.html'
})

export class UserCenter {
    constructor(public navCtrl: NavController,
                public userService: User,
                public alertCtrl: AlertController,
                public alert: AlertService,
                public navParams: NavParams,
                public todoService: Todo,) {
    }

    ionViewWillEnter(): void {
        console.info(this.userService.getUserInfo().isSetPayPwd);
        this.todoService.todoObject.showPayPwd = false;
        this.todoService.getTodoContent().then(
            res => console.info(res),
            err => {
                console.log(err);
                this.alert.presentAlert({msg: err});
            }
        );
    }

    goBack() {
        this.navCtrl.popToRoot();
    }

    goModifyPwd(): void {
        this.navCtrl.push(UserModifyPwd);
    }


    goModifyMobile(): void {
        console.info("修改手机");
        if (this.userService.getUserInfo().email) {
            this.navCtrl.push(UserBindEmail, {page: "modifyMobile"});
        } else {
            let param = {
                altTitle: "提示",
                altMsg: "未绑定邮箱,不可更改手机号",
                altBtns: ["确定"]
            };
            this.alert.presentBasicAlert(param);
        }
    }

    goModifyEmail(): void {
        console.info("修改邮箱");
        if (this.userService.getUserInfo().email) {
            this.navCtrl.push(UserBindMobile, {page: "modifyEmail"});
        } else {
            this.navCtrl.push(UserCompleteProfile);
        }
    }

    goPayPwd() {
        this.navCtrl.push(UserModifyPayPwdStep1);
    }

    setPayPwd() {
        console.log("去设置密码");
        this.navCtrl.push(UserSetPayPwd);
    }
}

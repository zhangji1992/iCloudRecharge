import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserLogin} from "../user-login/user-login";

@Component({
    selector: 'user-complete-register',
    templateUrl: 'user-complete-register.html'
})
export class UserCompleteRegister {
    constructor(public navCtrl: NavController) {
    }

    //完成注册，跳转到登录界面
    complete(): void {
        this.navCtrl.push(UserLogin);
    }
}

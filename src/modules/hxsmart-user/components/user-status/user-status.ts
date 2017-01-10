import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserLogin} from "../user-login/user-login";
import {UserRegister} from "../user-register/user-register";
import {User} from "../../providers/user";

@Component({
    selector: 'user-status',
    templateUrl: 'user-status.html'
})
export class UserStatus {
    constructor(public navCtrl: NavController,
                public userService: User) {
    }

    login(): void {
        this.navCtrl.push(UserLogin);
    }

    register(): void {
        this.navCtrl.push(UserRegister);
    }

}

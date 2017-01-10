import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {UserLogin} from "../../user-login/user-login";
@Component({
    selector: 'user-reset-pwd-step3',
    templateUrl: 'user-reset-pwd-step3.html'
})
export class UserResetPwdStep3 {
    constructor(public navParams: NavParams,
                public navCtrl: NavController) {
    }

    completeReset(): void {
        this.navCtrl.push(UserLogin);
    }
}

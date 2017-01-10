import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'CGB-2account-bankcard-change-success',
    templateUrl: 'CGB-2account-bankcard-change-success.html'
})
export class CGB2accountBankcardChangeSuccess {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        setTimeout(() => {
            this.navCtrl.popToRoot();
        }, 3000);
    }
}


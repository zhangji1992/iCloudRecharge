import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'CGB-2account-bind-success',
    templateUrl: 'CGB-2account-bind-success.html'
})
export class CGB2accountBindSuccess {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        setTimeout(() => {
            this.navCtrl.popToRoot();
        }, 3000);
    }
}


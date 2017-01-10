import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
@Component({
    selector: 'CGB-2account-cash-success',
    templateUrl: 'CGB-2account-cash-success.html'
})
export class CGB2accountCashSuccess {
    constructor(private navCtrl: NavController) {
        setTimeout(() => {
            this.navCtrl.popToRoot();
        }, 3000);
    }

}

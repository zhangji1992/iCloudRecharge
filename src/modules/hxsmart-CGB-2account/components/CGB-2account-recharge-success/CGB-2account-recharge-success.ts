import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
// import {PayAccount} from '../../providers/pay-account';
@Component({
    selector: 'CGB-2account-recharge-success',
    templateUrl: 'CGB-2account-recharge-success.html'
})
export class CGB2accountRechargeSuccess {
    constructor(private navCtrl: NavController) {
        setTimeout(() => {
            this.navCtrl.popToRoot();
        }, 3000);
    }

}

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PayAccount} from '../../providers/pay-account';
import {CGB2accountBind} from '../../../hxsmart-CGB-2account/components/CGB-2account-bind/CGB-2account-bind';
@Component({
    selector: 'pay-account-list',
    templateUrl: 'pay-account-list.html'
})
export class PayAccountList {
    constructor(private navCtrl: NavController, public payAccount: PayAccount) {
    }

    addAccount() {
        this.navCtrl.push(CGB2accountBind);
    }
}

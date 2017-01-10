import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {CGB2accountRechargeSuccess} from '../CGB-2account-recharge-success/CGB-2account-recharge-success';
import {CGB2Account} from '../../../hxsmart-CGB-2account/providers/CGB-2account';
import {Platform} from 'ionic-angular';
import {User} from "../../../hxsmart-user/providers/user";
@Component({
    selector: 'CGB-2account-recharge-detail',
    templateUrl: 'CGB-2account-recharge-detail.html'
})
export class CGB2accountRechargeDetail {
    constructor(public user: User,
                private platform: Platform,
                public toastCtrl: ToastController,
                private navCtrl: NavController,
                public navParams: NavParams,
                public CGB2Account: CGB2Account) {
    }

    recharge() {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.log('非移动平台');
            this.navCtrl.push(CGB2accountRechargeSuccess);
        } else {
            this.CGB2Account.accountRecharge(
                {
                    partyId: this.user.getUserInfo().id,
                    account: this.navParams.get('account').number,
                    payAccount: this.navParams.get('account').bankCard.number,
                    payAmount: this.navParams.get('value')
                }).then(
                () => {
                    console.log('充值成功');
                    this.navCtrl.push(CGB2accountRechargeSuccess);
                },
                (err) => {
                    let toast = this.toastCtrl.create({
                        message: `充值失败,${err}`,
                        duration: 3000
                    });
                    toast.present();
                    console.log('充值失败' + err);
                }
            );
        }
    }
}

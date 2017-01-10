import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {CGB2accountCashSuccess} from '../CGB-2account-cash-success/CGB-2account-cash-success';
import {CGB2Account} from '../../../hxsmart-CGB-2account/providers/CGB-2account';
import {Platform} from 'ionic-angular';
import {User} from "../../../hxsmart-user/providers/user";
@Component({
    selector: 'CGB-2account-cash-detail',
    templateUrl: 'CGB-2account-cash-detail.html'
})
export class CGB2accountCashDetail {
    constructor(public user: User,
                private platform: Platform,
                private navCtrl: NavController,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                public CGB2Account: CGB2Account) {
    }

    cash() {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.log('非移动平台');
            this.navCtrl.push(CGB2accountCashSuccess);
        } else {
            this.CGB2Account.accountWithdraw(
                {
                    partyId: this.user.getUserInfo().id,
                    recAccount: this.navParams.get('account').bankCard.number,
                    payAccount: this.navParams.get('account').number,
                    payAmount: this.navParams.get('value')
                }).then(
                () => {
                    console.log('提现成功');
                    this.navCtrl.push(CGB2accountCashSuccess);
                },
                (err) => {
                    let toast = this.toastCtrl.create({
                        message: `提现失败,${err}`,
                        duration: 3000
                    });
                    toast.present();
                    console.log('提现失败' + err)
                }
            );
        }
    }
}

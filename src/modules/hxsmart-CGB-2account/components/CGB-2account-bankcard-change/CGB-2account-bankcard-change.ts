import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {CGB2accountBankcardChangeSuccess} from '../CGB-2account-bankcard-change-success/CGB-2account-bankcard-change-success';
import {CGB2Account} from "../../providers/CGB-2account";
import {Platform} from 'ionic-angular';
import {User} from "../../../hxsmart-user/providers/user";
@Component({
    selector: 'CGB-2account-bankcard-change',
    templateUrl: 'CGB-2account-bankcard-change.html'
})
export class CGB2accountBankcardChange {
    idCard = '';
    name = '';

    constructor(public alertCtrl: AlertController,
                public user: User,
                public platform: Platform,
                public toastCtrl: ToastController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public CGB2Account: CGB2Account) {
    }

    // check() {
    //     let alert = this.alertCtrl.create({
    //         title: '改签银行卡',
    //         message: '改签银行卡，将改变原二类账户的绑定银行卡，是否改签？',
    //         buttons: [
    //             {
    //                 text: '否',
    //                 role: 'cancel',
    //                 handler: () => {
    //                     console.log('取消改签');
    //                 }
    //             },
    //             {
    //                 text: '是',
    //                 handler: () => {
    //                     console.log('走改签银行卡流程');
    //                     this.toNext();
    //                 }
    //             }
    //         ]
    //     });
    //     alert.present();
    // }

    toNext() {
        console.log(this.name);
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.log('非移动平台');
            this.navCtrl.push(CGB2accountBankcardChangeSuccess, {name: this.name});
        } else {
            this.CGB2Account.changeGCBankCard({
                partyId: this.user.getUserInfo().id,
                bankCardNum: this.navParams.get('account').bankCard.number,
                realName: this.name,
                accountNum: this.navParams.get('account').number,
                certNo: this.idCard
            }, this.navParams.get('index')).then(
                webApp => {
                    webApp.on('exit').subscribe(
                        () => {
                            console.log('用户关闭广发链接');
                            this.CGB2Account.changeBankCardBackQuery(
                                {
                                    partyId: this.user.getUserInfo().id,
                                    certNo: this.idCard
                                },
                                this.navParams.get('index')
                            ).then(
                                () => {
                                    this.navCtrl.push(CGB2accountBankcardChangeSuccess);
                                },
                                () => {
                                    console.log('改签失败')
                                }
                            )
                        },
                        err => {
                            console.log(err)
                        }
                    );
                }
            );
        }
    }
}


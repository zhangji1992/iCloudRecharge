import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {CGB2Account} from "../../providers/CGB-2account";
import {User} from "../../../hxsmart-user/providers/user";
@Component({
    selector: 'CGB-2account-detail',
    templateUrl: 'CGB-2account-detail.html'
})
export class CGB2accountDetail {
    constructor(public user: User,
                public navParams: NavParams,
                private navCtrl: NavController,
                public CGB2Account: CGB2Account,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController) {
    }

    deleteAccount(account) {
        let confirm = this.alertCtrl.create({
            title: '智慧充值',
            message: '您确定要删除该二类账户吗？',
            buttons: [
                {
                    text: '确定',
                    handler: () => {
                        this.CGB2Account.dismissBindingAccount(account).then(
                            () => {
                                let toast = this.toastCtrl.create({
                                    message: `解除二类账户成功`,
                                    duration: 3000
                                });
                                toast.present();
                                console.log('解除二类账户成功');
                                this.navCtrl.popToRoot();
                            },
                            (err) => {
                                let toast = this.toastCtrl.create({
                                    message: `解除二类账户失败,${err}`,
                                    duration: 3000
                                });
                                toast.present();
                                console.log('解除二类账户失败' + err);
                            }
                        );
                    }
                },
                {
                    text: '取消',
                    handler: () => {

                    }
                }
            ]
        });
        confirm.present();
    }
}

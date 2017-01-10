import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from "ionic-angular";
import {EtcCardRechargeComponent} from "../etc-card-recharge/etc-card-recharge";
import {EtcCardRechargeRecordComponent} from "../etc-card-recharge-record/etc-card-recharge-record";
import {EtcCard} from "../../providers/etc-card";
import {User} from "../../../hxsmart-user/providers/user";
import {HxsmartNFC} from "../../../hxsmart-native/providers/plugins/hxsmart-nfc"

@Component({
    selector: 'etc-card-list',
    templateUrl: 'etc-card-list.html'
})
export class EtcCardListComponent implements OnInit {
    constructor(private user: User,
                private etcCard: EtcCard,
                private NFC: HxsmartNFC,
                private alertCtrl: AlertController,
                private navCtrl: NavController) {
    }

    /**
     * 确认弹窗
     * @param title
     * @param msg
     * @param buts
     * @param card
     */
    presentConfirm(title, msg, buts, card) {
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: buts[0],
                    role: 'cancel',
                    handler: () => {
                        this.NFC.openNFCSetting();
                    }
                },
                {
                    text: buts[1],
                    handler: () => {
                        this.navCtrl.push(EtcCardRechargeRecordComponent, card);
                    }
                }
            ]
        });
        alert.present();
    }

    ngOnInit() {
        let param = {
            ClientPartyId: this.user.getUserInfo().id,
            ClientStatus: '1'
        };
        this.etcCard.getBoundEtc(param)
            .catch(err => this.etcCard.toast(err || '发生异常'));       //发生异常
    }

    goToCharge(card: any) {
        this.NFC.checkModule()
            .then(() => {
                this.NFC.checkState()
                    .then(() => {
                        card.hasNFC = true;
                        this.navCtrl.push(EtcCardRechargeComponent, card);
                    })
                    .catch(() => {
                        card.hasNFC = false;
                        this.presentConfirm('提示', '您的NFC尚未打开，若使用NFC写卡，请先打开NFC功能。', ['去打开NFC', '不使用NFC'], card);
                    });
            })
            .catch(() => {
                card.hasNFC = false;
                this.navCtrl.push(EtcCardRechargeComponent, card);
            });

        // this.navCtrl.push(EtcCardRechargeComponent, card);
    }

    goToChargeRecord(card: any) {
        this.navCtrl.push(EtcCardRechargeRecordComponent, card);
    }
}

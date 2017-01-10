import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../../hxsmart-user/providers/user";
import {EtcCard} from "../../providers/etc-card";
import {EtcCardRechargeRecordComponent} from "../etc-card-recharge-record/etc-card-recharge-record";
import {HxsmartNFC} from "../../../hxsmart-native/providers/plugins/hxsmart-nfc";

@Component({
    selector: 'etc-card-recharge',
    templateUrl: 'etc-card-recharge.html'
})
export class EtcCardRechargeComponent {
    hasNFC: boolean = false;
    stepNow: number = 1;
    rechargeNum: string;

    cardBalance: string = '';
    PayChannelList: any[] = [];

    constructor(private navCtrl: NavController,
                private user: User,
                private NFC: HxsmartNFC,
                private navParams: NavParams,
                private etcCard: EtcCard) {
    }

    goNext(value) {
        console.log('hasNFC', this.navParams.get('hasNFC'));

        if (this.navParams.get('hasNFC')) {
            switch (value) {
                case 1:
                    console.log('step1');

                    let timer = setInterval(() => {
                        this.NFC.registerConnectedCallback()
                            .then(data => {
                                this.NFC.readCard()
                                    .then(() => {

                                        this.cardBalance = data;
                                        this.stepNow = 2;
                                        clearInterval(timer);
                                    })
                                    .catch(err => {
                                        this.etcCard.toast(`读卡失败${err}`);
                                        clearInterval(timer);
                                    })
                            })
                            .catch(() => {
                                this.etcCard.toast(`读卡失败,请将NFC卡贴近手机后重试`);
                            })
                    }, 3000);
                    break;
                case 2:
                    console.log('step2');
                    let loader = this.etcCard.loading('充值中...');
                    let param4 = {
                        PurchaseOrderPartyId: this.user.getUserInfo().id,
                        SupplierPartyId: this.navParams.get('SupplierPartyId'),
                        TotalAmount: this.rechargeNum,
                        PayChannelCode: this.etcCard.rechargeAccount.payChannelCode,
                        PayOrderPartyId: this.user.getUserInfo().id,
                        PayAccountId: this.etcCard.rechargeAccount.payAccountId,
                        payPwd: this.user.getUserInfo().pwdContent,
                        ModuleCode: 'ETC',
                        OrderItems: [{
                            ProductId: '3',
                            Quantity: this.rechargeNum,
                            UnitPrice: '1',
                            ItemDesc: '',
                            SupplierClientId: this.navParams.get('SupplierClientId')
                        }]
                    };
                    console.log('param4', param4);
                    this.etcCard.rechargeEtc(param4)
                        .then(() => {
                            this.stepNow = 3;
                            loader.dismiss();
                        })
                        //发生异常
                        .catch(err => {
                            loader.dismiss();
                            this.etcCard.toast(`发生异常，${err}`);
                        });
                    break;
                case 3:
                    console.log('step3');
                    //写卡
                    this.NFC.registerConnectedCallback()
                        .then(data => {
                            this.NFC.writeCard(Number(this.rechargeNum))
                                .then(() => {
                                    this.etcCard.toast(`写卡成功${data}`);
                                    this.stepNow = 4;
                                })
                                .catch(err => {
                                    this.etcCard.toast(`写卡失败${err}`);
                                    this.stepNow = 4;
                                });
                        })
                        .catch(err => this.etcCard.toast(`发生异常${err}`));
                    break;
                case 4:
                    console.log('step4');

                    //返回上级页面
                    this.navCtrl.pop();
                    break;
                default:
                    console.log('stepNow err');
            }
        } else {
            switch (value) {
                case 1:
                    console.log('step1');

                    //输入充值金额
                    if (!this.rechargeNum) {
                        this.etcCard.toast('请输入充值金额');
                        return;
                    }

                    this.stepNow = 2;
                    break;
                case 2:
                    console.log('step2');

                    let loader = this.etcCard.loading('充值中...');

                    //充值
                    let param2 = {
                        PurchaseOrderPartyId: this.user.getUserInfo().id,
                        SupplierPartyId: this.navParams.get('SupplierPartyId'),
                        TotalAmount: this.rechargeNum,
                        PayChannelCode: this.etcCard.rechargeAccount.payChannelCode,
                        PayOrderPartyId: this.user.getUserInfo().id,
                        PayAccountId: this.etcCard.rechargeAccount.payAccountId,
                        payPwd: this.user.getUserInfo().pwdContent,
                        ModuleCode: 'ETC',
                        OrderItems: [{
                            ProductId: '3',
                            Quantity: this.rechargeNum,
                            UnitPrice: '1',
                            ItemDesc: '',
                            SupplierClientId: this.navParams.get('SupplierClientId')
                        }]
                    };
                    // console.log('param2', param2);
                    this.etcCard.rechargeEtc(param2)
                        .then(() => {
                            loader.dismiss();
                            this.stepNow = 3;
                        })
                        //发生异常
                        .catch(err => {
                            loader.dismiss();
                            this.etcCard.toast(`发生异常，${err}`);
                        });
                    break;
                case 3:
                    console.log('step4');

                    //返回上级页面
                    this.navCtrl.pop();
                    break;
                default:
                    console.log('stepNow err');
            }
        }
    }

    goBack() {
        switch (this.stepNow) {
            case 4:
                console.log('goBack step3');
                this.stepNow = 3;
                break;
            case 3:
                console.log('goBack step2');
                this.stepNow = 2;
                break;
            case 2:
                console.log('goBack step1');
                this.stepNow = 1;
                break;
            default:
                console.log('goBack component');
                this.navCtrl.pop();
        }
    }

    goToRechargeRecord(card) {
        this.navCtrl.push(EtcCardRechargeRecordComponent, card);
    }
}

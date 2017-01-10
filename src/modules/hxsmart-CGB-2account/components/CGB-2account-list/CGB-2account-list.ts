import {Component} from '@angular/core';
import {NavController, AlertController} from "ionic-angular";
import {recharge} from '../recharge/recharge';
import {cash} from '../cash/cash';
import {CGB2accountDetail} from '../CGB-2account-detail/CGB-2account-detail';
import {CGB2accountBankcardChange} from '../CGB-2account-bankcard-change/CGB-2account-bankcard-change';
import {User} from "../../../hxsmart-user/providers/user";
import {CGB2Account} from "../../providers/CGB-2account";
import {UserSetPayPwd} from "../../../hxsmart-user/components/user-set-pay-pwd/user-set-pay-pwd";
@Component({
    selector: 'CGB-2account-list',
    templateUrl: 'CGB-2account-list.html'
})
export class CGB2AccountList {
    private cardObj: any;//存储我的账户信息，从我的账户服务请求过来的

    constructor(public user: User,
                public navCtrl: NavController,
                public account: CGB2Account,
                public alertCtrl: AlertController) {
    }

    ngOnInit() {//这里少一个xx银行类型的判断
        this.account.getAccountInfo({partyId: this.user.getUserInfo().id})
            .then(
                () => {
                    this.cardObj = this.account.accountList;
                    console.log(this.cardObj);
                },
                err => console.log(err)
            );
    }

    showDetail(account) {//二类账户详情
        this.navCtrl.push(CGB2accountDetail, {'account': account});
    }

    //充值
    pay(account, index, event) {
        event.stopPropagation();
        this.check(account, index, "pay");
    }

    //提现
    cash(account, index, event) {
        event.stopPropagation();
        this.check(account, index, "cash");
    }

    //在充值和提现的时候判断,1是否存在签约银行卡,2是否设置支付账户,type:充值/提现
    check(account, index, type) {
        if (!account.bankCard.number) {//未签约银行卡
            let prompt = this.alertCtrl.create({
                title: '智慧充值',
                message: "尚未签约银行卡,是否签约?",
                buttons: [
                    {
                        text: '否',
                        handler: () => {
                            console.log('不走签约银行卡流程');
                        }
                    },
                    {
                        text: '是',
                        handler: () => {
                            console.log('走签约银行卡流程');
                            this.changeCard(account, index);
                        }
                    }
                ]
            });
            prompt.present();
        }
        else if (!this.user.getUserInfo().isSetPayPwd) {
            let prompt = this.alertCtrl.create({
                title: '智慧充值',
                message: "尚未设置支付密码,是否设置?",
                buttons: [
                    {
                        text: '否',
                        handler: () => {
                            console.log('不走设置支付密码流程');
                        }
                    },
                    {
                        text: '是',
                        handler: () => {
                            console.log('走设置支付密码流程');
                            this.navCtrl.push(UserSetPayPwd);
                        }
                    }
                ]
            });
            prompt.present();
        }
        else {
            switch (type) {
                case "pay":
                    this.navCtrl.push(recharge, {'account': account});
                    break;
                case "cash":
                    this.navCtrl.push(cash, {'account': account});
                    break;
                default:
                    console.log('操作异常');
            }
        }
    }

//签约银行卡
    changeCard(account, index, event?: any) {
        event.stopPropagation();
        this.navCtrl.push(CGB2accountBankcardChange, {'account': account, 'index': index});
    }

    onOff(element: any, event: any, money?: any) {//页面余额的显示标志
        event.stopPropagation();
        if (element.dataset.flag == 'false') {
            element.innerHTML = money;
            element.dataset.flag = 'true';
        } else {
            element.innerHTML = '**.**';
            element.dataset.flag = 'false';
        }
    }

//解除银行卡和2类账户的绑定,
    cancelBankCard(account) {
        this.account.cancelBankCard(account).then(
            (rel) => {
                console.log('解签成功', rel)
            },
            (err) => {
                console.log('解签失败', err)
            }
        )
    }
}

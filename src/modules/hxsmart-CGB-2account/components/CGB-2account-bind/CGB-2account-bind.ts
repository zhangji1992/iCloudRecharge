import {Component} from '@angular/core';
import {NavController, AlertController, ToastController, Platform, LoadingController} from 'ionic-angular';

import {CGB2accountBindSuccess} from '../CGB-2account-bind-success/CGB-2account-bind-success';
import {CGB2Account} from "../../providers/CGB-2account";
import {User} from "../../../hxsmart-user/providers/user";
import {CGB2accountRealNameChecked} from "../CGB-2account-real-name-checked/CGB-2account-real-name-checked";
import {AccountRequest} from "../../providers/CGB-2account-request";
@Component({
    selector: 'CGB-2account-bind',
    templateUrl: 'CGB-2account-bind.html'
})
export class CGB2accountBind {
    idCard: string;
    name: string;

    constructor(public platform: Platform,
                public user: User,
                public navCtrl: NavController,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public CGB2Account: CGB2Account,
                public accountRequest: AccountRequest,
                public loadingCtrl: LoadingController) {
    }

    toNext() {
        let regName = /^[\u4e00-\u9fa5]{2,7}$/;//2-7位的汉子
        let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//15位数字，18位数字，17位数字加一个校验码X，x
        if (!regName.test(this.name)) {
            let prompt = this.alertCtrl.create({
                title: '姓名输入不正确',
                message: "请重新输入正确的姓名",
                buttons: [
                    {
                        text: '确定',
                        role: 'cancel',
                        handler: () => {
                            console.log('111');
                        }
                    }
                ]
            });
            prompt.present();
        }
        else if (!regIdNo.test(this.idCard)) {
            let prompt = this.alertCtrl.create({
                title: '身份证号码输入不正确',
                message: "请重新输入正确的身份证号码",
                buttons: [
                    {
                        text: '确定',
                        role: 'cancel',
                        handler: () => {
                            console.log('222222');
                        }
                    }
                ]
            });
            prompt.present();
        }
        else {
            if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
                console.log('非移动平台');
                this.navCtrl.push(CGB2accountBindSuccess, {name: this.name});
            } else {
                console.log('填写格式正确，开始调用开通广发二类账户');
                let account = '';
                this.CGB2Account.addGC2Account({
                    partyId: this.user.getUserInfo().id,
                    certNo: this.idCard,
                    realName: this.name,
                    accountNum: account
                }).then(
                    (rel) => this.checked(rel)
                ).then(
                    webApp => {
                        webApp.on('exit').subscribe(
                            () => {
                                console.log('用户关闭广发链接');
                                this.CGB2Account.addPayGCwAccountBackQuery(
                                    {
                                        partyId: this.user.getUserInfo().id,
                                        certNo: this.idCard
                                    }
                                ).then(
                                    () => {
                                        this.navCtrl.push(CGB2accountBindSuccess);
                                    },
                                    () => {
                                        console.log('绑定||类账户失败')
                                    }
                                )
                            },
                            () => {
                                console.log('未走广发流程')
                            }
                        );
                    }
                )
            }
        }
    }

    private checked(res): Promise<any> {
        return new Promise((resolve, reject) => {
            let loading = this.loading("加载中…");
            switch (res.status + "") {
                case '1'://只有二类账户,进入签约广发卡流程
                    console.log("进入绑定银行卡流程");
                    this.accountRequest.bindGCBankCard(
                        {
                            certNo: this.idCard,
                            realName: this.name,
                            accountNum: res.number
                        }
                    ).then((res) => {
                        loading.dismiss();
                        resolve(res);
                    }, () => {
                        loading.dismiss();
                        reject();
                        this.toast("请求第三方界面失败，请重试！");
                    });
                    break;
                case '2'://有二类账户，有银行卡,且此没有绑定此用户的app,走后台验证
                    loading.dismiss();
                    console.log(res, this.idCard);
                    this.navCtrl.push(CGB2accountRealNameChecked, {'rel': res, 'certNo': this.idCard, name: this.name});
                    reject();
                    break;
                case '3'://都没有
                    console.log("进入开通二类账户流程");
                    this.accountRequest.openGC2Account({
                        certNo: this.idCard,
                        realName: this.name,
                    }).then((b) => {
                        loading.dismiss();
                        resolve(b);
                    }, () => {
                        loading.dismiss();
                        reject();
                    });
                    break;
                case '4'://此二类账户已经绑定app
                    console.log("此二类账户已经绑定app");
                    this.toast("此二类账户已经绑定app");
                    loading.dismiss();
                    reject();
                    break;
                default:
                    loading.dismiss();
                    this.toast("用户二类账户状态未知！");
                    reject();
                    break;
            }
        });
    }

    /**
     * loading效果
     * @param msg {string} 提示信息
     */
    private loading(msg: string): any {
        let loader = this.loadingCtrl.create({
            content: msg,
        });
        loader.present();
        return loader;
    }

    /**
     * 吐丝
     * @param msg {string} 吐丝信息
     */
    private toast(msg: string): void {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
        });
        toast.present();
    }
}


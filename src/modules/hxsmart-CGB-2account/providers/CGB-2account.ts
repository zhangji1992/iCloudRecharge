import {Injectable} from '@angular/core';
import {ToastController, LoadingController} from "ionic-angular";
import {AccountRequest} from './CGB-2account-request';
import {HxsmartSecurity} from "../../hxsmart-native/providers/plugins/hxsmart-security";

@Injectable()
export class CGB2Account {
    public accountInfo: any = null;//二类账户详细信息

    /**
     * @type {Array}
     * @description 数据格式
     * [{
          id: "",//二类账户id
          number: "",//二类账户号
          type: "",//二类账户类型
          balance: "",//余额
          frozenBalance: "",//冻结金额
          userId: "",//用户id
          bankCard:""//与二类账户绑定的银行卡信息
      }]
     */
    public accountList: Array<any> = [];//二类账户列表

    constructor(public accountRequest: AccountRequest, public security: HxsmartSecurity,
                public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    }

    /**
     * 解除银行卡绑定
     * @param param {object} {partyId:"",opAccount:"银行帐号",vAccountNo:"二类账户号"}
     * @returns {Promise<T>}
     */
    public cancelBankCard(param: any): Promise<any> {
        let l = this.loading("解绑中…");
        return new Promise((resolve, reject) => {
            this.accountRequest.cancelBind(param)
                .then((res) => {
                    l.dismiss();
                    resolve(res)
                }, (err) => {
                    l.dismiss();
                    reject(err);
                })
        })
    }

    /**
     * 解除||类账户和平台绑定
     * @param param {object} {partyId:"",vAccountNo:"二类账户号"}
     * @returns {Promise<T>}
     */
    public dismissBindingAccount(param: any): Promise<any> {
        let l = this.loading("解绑中…");
        return new Promise((resolve, reject) => {
            this.accountRequest.dismissBindingAccount(param)
                .then((res) => {
                    l.dismiss();
                    resolve(res)
                }, (err) => {
                    l.dismiss();
                    reject(err);
                })
        })
    }

    /**
     * 获取我已经绑定到平台的所有支付账户的信息
     * @param param {object} {partyId:}
     * @returns {Promise<any>}
     */
    public getAccountInfo(param?: any): Promise<any> {
        param = param || {};
        let l = this.loading("加载中…");
        return new Promise<any>((resolve, reject) => {
            this.accountRequest.getBindAccountInfo(param)
                .then(
                    (res) => {
                        l.dismiss();
                        this.accountList = res;
                        resolve(res);
                    },
                    (err) => {
                        l.dismiss();
                        reject(err)
                    })
        })
    }

    /**
     * 二类账户充值
     * @param param {object} {partyId:"",account:"",payAccount:"",payAmount:""} 都为必填
     * @returns {Promise<any>}
     */
    public accountRecharge(param: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.security.inputPwd({type: 2})
                .then(
                    (data) => {
                        console.log(param, "xxxxxxxxxxxxxxx");
                        this.security.encryptObject({
                            partyId: param.partyId + "",
                            account: param.account,
                            payAccount: param.payAccount,
                            payAmount: param.payAmount,
                            payPwd: data
                        })
                            .then(
                                (res2) => {
                                    let l = this.loading('充值中…');
                                    this.accountRequest.accountRecharge(res2)
                                        .then(
                                            (res3) => {
                                                l.dismiss();
                                                resolve(res3)
                                            },
                                            (err3) => {
                                                l.dismiss();
                                                reject(err3)
                                            }
                                        )
                                },
                                (err2) => {
                                    reject(err2);
                                }
                            )
                    },
                    (err1) => {
                        reject(err1);
                    }
                )
        });
        return promise;
    }


    /**
     * 二类账户提现
     * @param param {object} {partyId:"",recAccount:"",payAccount:"",payAmount:""} 都为必填
     * @returns {Promise<any>}
     */
    public accountWithdraw(param: any): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.security.inputPwd({type: 2})
                .then(
                    (res) => {
                        this.security.encryptObject({
                            partyId: param.partyId + "",
                            recAccount: param.recAccount,
                            payAccount: param.payAccount,
                            payAmount: param.payAmount + "",
                            payPwd: res
                        })
                            .then(
                                (res2) => {
                                    let l = this.loading('提现中…');
                                    this.accountRequest.accountWithdraw(res2)
                                        .then(
                                            (res3) => {
                                                l.dismiss();
                                                resolve(res3)
                                            },
                                            (err3) => {
                                                l.dismiss();
                                                reject(err3)
                                            }
                                        )
                                },
                                (err2) => {
                                    reject(err2)
                                });
                    },
                    (err4) => {
                        reject(err4);
                    }
                );
        });
        return promise;
    }

    /**
     *  签约银行卡
     * @param param {object} {partyId:"",bankCardNum:"银行帐号",realName:"",certNo:"",accountNum:""}
     * @param index {number} 二类账户对应的索引
     * @returns {boolean}
     */
    public changeGCBankCard(param: any, index: number): Promise<any> {
        let l: any;
        return new Promise(
            (resolve, reject) => {
                /*if (parseFloat(this.accountList[index].balance) > 0) {
                 this.toast('二类账户余额不为0，不能改签！');
                 reject();
                 l.dismiss();
                 }*/
                //{partyId:"",opAccount:"银行帐号",vAccountNo:"二类账户号"}
                /*this.accountRequest.cancelBind(
                 {
                 partyId: param.partyId,
                 opAccount: param.bankCardNum,
                 vAccountNo: param.accountNum
                 })
                 .then(()=> {
                 this.accountList[index].bankCard = null;
                 l.dismiss();
                 setTimeout(()=> {
                 l = this.toast("加载中…")
                 });

                 }, (err)=> {
                 l.dismiss();
                 console.log(err, '解绑银行卡失败');
                 reject();
                 this.toast("解绑银行卡失败，请重试！");
                 });*/
                l = this.loading("加载中…");
                this.accountRequest.bindGCBankCard({
                    realName: param.realName,
                    certNo: param.certNo,
                    accountNum: param.accountNum
                }).then((res) => {
                    l.dismiss();
                    if (res) {
                        resolve(res);
                    } else {
                        reject();
                        this.toast("操作失败，请重试！")
                    }
                }, () => {
                    l.dismiss();
                    this.toast("打开第三方界面失败，请重试！");
                    reject();
                });
            });
    }

    /**
     * 签约银行卡后，同步信息判断是否签约成功
     * @param param {object} {partyId: "",certNo:""} 都为必填
     * @param index {number} 索引
     * @returns {Promise<T>|Promise}
     */
    public changeBankCardBackQuery(param: any, index: number) {
        return new Promise((resolve, reject) => {
            this.accountRequest.asyncAccountInfo(
                {
                    partyId: param.partyId,
                    certNo: param.certNo
                }).then(
                (res) => {
                    if (res.status == 2) {
                        this.accountList[index].bankCard = res.bankCard;
                        this.accountList[index].balance = 0;
                        this.toast("银行卡签约成功");
                        resolve();
                    } else {
                        reject();
                        this.toast("银行卡签约失败，请重试！");
                    }
                }, () => {
                    reject();
                    this.toast("同步二类账户信息失败，用户信息以下一次登录为准！");
                })
        });
    }

    /**
     * 添加支付账户
     * @param param {object} {realName:"",certNo:"",partyId:"",accountNum:""} accountNum为选填，当用户拥有二类账户传递；其他为必填
     * return {boolean} 是否添加成功
     */
    public addGC2Account(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let loading = this.loading("加载中…");
            this.accountRequest.getAccountStatus({partyId: param.partyId, certNo: param.certNo})
                .then(
                    (res) => {
                        loading.dismiss();
                        resolve(res);
                        // switch (res.status + "") {
                        //     case '1'://只有二类账户,进入签约广发卡流程
                        //         console.log("进入绑定银行卡流程");
                        //         this.accountRequest.bindGCBankCard(
                        //             {
                        //                 realName: param.realName,
                        //                 certNo: param.certNo,
                        //                 accountNum: param.accountNum
                        //             }
                        //         ).then((res) => {
                        //             loading.dismiss();
                        //             resolve(res);
                        //         }, () => {
                        //             loading.dismiss();
                        //             reject();
                        //             this.toast("请求第三方界面失败，请重试！");
                        //         });
                        //         break;
                        //     case '2'://有二类账户，有银行卡
                        //         loading.dismiss();
                        //         this.accountRequest.openGC2Account({
                        //             realName: param.realName,
                        //             certNo: param.certNo
                        //         }).then((res1) => {
                        //             loading.dismiss();
                        //             resolve(res1);
                        //         }, () => {
                        //             loading.dismiss();
                        //             reject();
                        //         });
                        //         break;
                        //     case '3'://都没有
                        //         console.log("进入开通二类账户流程");
                        //         this.accountRequest.openGC2Account({
                        //             realName: param.realName,
                        //             certNo: param.certNo
                        //         }).then((b) => {
                        //             loading.dismiss();
                        //             resolve(b);
                        //         }, () => {
                        //             loading.dismiss();
                        //             reject();
                        //         });
                        //         break;
                        //     default:
                        //         loading.dismiss();
                        //         this.toast("用户二类账户状态未知！");
                        //         reject();
                        //         break;
                        // }
                    }, (err) => {
                        if (err.retMsg) {
                            this.toast(err.retMsg);
                        }
                        else {
                            this.toast("查询二类状态失败，请重试！");
                        }
                        loading.dismiss();
                        reject();
                        console.log(err, "查询二类账户失败");
                    });
        });
    }

    /**
     * 添加支付账户，同步信息
     * @param param object { partyId: "", certNo: ""}
     * @returns {Promise<T>|Promise}
     */
    addPayGCwAccountBackQuery(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.accountRequest.asyncAccountInfo(
                {
                    partyId: param.partyId,
                    certNo: param.certNo
                }).then(
                (res) => {
                    if (res.status == 2) {
                        let obj = {
                            id: res.accountId,
                            number: res.accountNum,
                            type: res.accountType,
                            balance: 0,
                            frozenBalance: 0,
                            userId: res.partyId,
                            bankCard: res.bankCard
                        };
                        this.accountList.push(obj);
                        this.toast("添加支付账户成功");
                        resolve();
                    } else {
                        reject();
                        this.toast("添加支付账户失败，请重试！");
                    }
                }, (err) => {
                    reject();
                    console.log(err, '同步信息失败');
                    this.toast("同步二类账户信息失败，用户信息以下一次登录为准！")
                })
        });
    }

    /**
     * 绑定指定身份证号关联的二类账户
     * @param param {object} {partyId:"",certNo:""} 都为必填
     * @returns {Promise<any>}
     */
    public bindExitAccount(param: any): Promise<any> {
        let l = this.loading("绑定中…");
        return new Promise((resolve, reject) => {
            this.accountRequest.bindExitAccount(param)
                .then((res) => {
                    l.dismiss();
                    resolve(res)
                }, (err) => {
                    l.dismiss();
                    reject(err);
                })
        })
    }

    /**
     * loading效果
     * @param msg {string} 提示信息
     */
    private loading(msg: string): any {
        let loader = this.loadingCtrl.create({
            content: msg,
            dismissOnPageChange: true

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

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Platform} from 'ionic-angular';
import {AccountInterface} from './CGB-2account-interface';
import {InAppBrowser} from 'ionic-native'
import 'rxjs/add/operator/toPromise';
import {MD5} from "../tool/md5";

@Injectable()
export class AccountRequest {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
                private accountInterface: AccountInterface,
                private platform: Platform) {
    }

    /**
     * 获取我已经绑定到平台的所有支付账户的信息
     * @param data {object} {partyId:"26"}
     * @returns {Promise<any>}
     */
    public getBindAccountInfo(data?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.getAccountInfo, data)
                .then((res) => {
                    resolve(this.formatAccount(res));
                }, (err) => {
                    reject(err)
                })
        });
    }

    /**
     * 格式化二类账户信息
     * @param data
     * @returns {Array}
     */
    private formatAccount(data?: any): Array <any> {
        let result = [];
        if (data.context) {
            if (data.context.length > 0) {
                let temp = data.context;
                for (let i = 0, l = data.context.length; i < l; i++) {
                    result.push(
                        {
                            id: temp[i].accountId,
                            number: temp[i].accountNo,
                            type: temp[i].accountType,
                            balance: temp[i].availableBalance,
                            frozenBalance: temp[i].frozenBalance,
                            userId: temp[i].usePartyId,
                            holdUserName: temp[i].holdUserName,
                            bankCard: {
                                number: temp[i].refAccountNo,
                                type: temp[i].refAccountType == 3 ? "广发银行" : "未知银行"
                            }
                        })
                }
                return result;
            }
        }
        return result;
    }

    /**
     * 将指定的广发Ⅱ类账户与银行卡的绑定关系解除
     * @param param {object} {partyId:"",opAccount:"银行帐号",vAccountNo:"二类账户号"} 银行帐号为选填，其他为必填。
     * @returns {Promise<any>}
     */
    public cancelBind(param?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.cancelBind, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err)
                })
        });
    }

    /**
     * 将指定的广发Ⅱ类账户与平台的绑定关系解除
     * @param param {object} {partyId:"",vAccountNo:"二类账户号"} 银行帐号为选填，其他为必填。
     * @returns {Promise<any>}
     */
    public dismissBindingAccount(param?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.dismissBindingAccount, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err)
                })
        });

    }

    /**
     * 同步账户信息
     * @param param {object} {partyId:"",certNo:"身份证号"} 都为必填
     * @returns {Promise<any>}
     */
    public asyncAccountInfo(param: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.asyncAccountInfo, param)
                .then((res) => {
                    resolve(this.formatAccountInfo(res.context));
                }, (err) => {
                    reject(err)
                })
        });
    }


    /**
     * 格式化同步二类账户信息
     * @param param {object}
     * @returns {{status: any, accountNum: any, partyId: any, balance: number, bankCard: {number: any, type: (string|string)}}}
     */
    private formatAccountInfo(param: any): any {
        let obj = {
            accountId: "",
            status: param.accountFlag,
            accountNum: "",
            accountType: "",
            partyId: "",
            balance: "",
            bankCard: {
                number: "",
                type: ""
            }
        };
        if (param.eAccount && param.bankAccount) {
            obj = {
                accountId: param.eAccount.accountId || "",
                status: param.accountFlag,
                accountNum: param.eAccount.accountNo || "",
                accountType: param.eAccount.accountType || "",
                partyId: param.eAccount.usePartyId || "",
                balance: param.eAccount.availableBalance || "",
                bankCard: {
                    number: param.bankAccount.accountNo || "",
                    type: param.bankAccount.type == 3 ? "广发银行" : "其他银行"
                }
            };
        }
        return obj;
    }

    /**
     * 获取二类账户状态
     * @param param {object} ｛partyId:"",certNo:"身份证号"｝
     * @returns {Promise<any>}
     */
    public getAccountStatus(param: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.checkAccountStatus, param)
                .then((res) => {
                    resolve(this.formatAccountStatus(res.context));
                }, (err) => {
                    reject(err)
                })
        });
    }

    /**
     * 格式化检查用户二类账户状态数据
     * @param param
     * @returns {{status: any, phone: any, accountNum: (any|string), bankNum: any}}
     */
    private formatAccountStatus(param: any): any {
        let obj = {
            status: param.accountFlag,
            phone: param.Phone || "",
            accountNum: param.AccountNo || "",
            bankNum: param.BankCardNo || ""
        };
        return obj;
    }

    /**
     * 二类账户充值
     * @param param {object} {partyId:"",account:"",payAccount:"",payAmount:""} 都为必填
     * @returns {Promise<any>}
     */
    public accountRecharge(param: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.accountRecharge, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    if (err.retMsg) reject(err.retMsg);
                    else reject(err);
                })
        });
    }

    /**
     * 改签广发银行卡
     * @param param {object} {realName:"",certNo:"",accountNum:""}
     * @returns {string}
     */
    public bindGCBankCard(param: any): Promise<any> {
        let privateInfo = MD5(this.accountInterface.channelId + param.realName + param.certNo
            + this.accountInterface.waterNum + param.accountNum + this.accountInterface.signKey);
        let address = this.accountInterface.openGCAccountAddress
            + "custName=" + param.realName//身份证对应真实姓名
            + "&privateInfo=" + privateInfo
            + "&certNo=" + param.certNo//身份证号
            + "&transferFlowNo=" + this.accountInterface.waterNum
            + "&channelId=" + this.accountInterface.channelId
            + "&accountId=" + param.accountNum
            + "&merchantUrl=" + this.accountInterface.sucBackAddress;
        return this.openGC2AccountUI(address);
    }

    /**
     * 开通广发二类账户
     * @param param {object} {realName:"",certNo:""}
     */
    public openGC2Account(param: any): Promise<any> {
        let privateInfo = MD5(this.accountInterface.channelId + param.realName
            + param.certNo + this.accountInterface.waterNum + this.accountInterface.signKey);
        let address = this.accountInterface.openGCAccountAddress
            + "custName=" + param.realName
            + "&privateInfo=" + privateInfo
            + "&certNo=" + param.certNo
            + "&transferFlowNo=" + this.accountInterface.waterNum
            + "&channelId=" + this.accountInterface.channelId
            + "&merchantUrl=" + this.accountInterface.sucBackAddress;
        return this.openGC2AccountUI(address);
    }

    /**
     * 打开广发界面根据请求地址
     * @param address {string} 广发请求地址
     * @returns {any} {browser}
     */
    private openGC2AccountUI(address: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('ios') || this.platform.is('android') && !this.platform.is("mobileweb")) {
                let option = this.platform.is('ios') ? "location=no" : "location=yes";
                let browser = new InAppBrowser(address, "_blank", option);
                resolve(browser);
            }
            else {
                window.open(address, '_blank');
                reject(null);
            }
        });

    }


    /**
     * 二类账户提现
     * @param param {object} {partyId:"",recAccount:"",payAccount:"",payAmount:""} 都为必填
     * @returns {Promise<any>}
     */
    public accountWithdraw(param: any): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.accountWithdraw, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    if (err.retMsg) reject(err.retMsg);
                    else reject(err);
                })
        });
    }

    /**
     * 绑定指定身份证号关联的二类账户
     * @param param {object} {partyId:"",certNo:""} 都为必填
     * @returns {Promise<any>}
     */
    public bindExitAccount(param: any): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.bindExitAccount, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err)
                })
        });
    }

    /**
     * 开通新的二类账户
     * @param param {object} {partyId:"",certNo:""} 都为必填
     * @returns {Promise<any>}
     */
    public bindNewAccount(param: any): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            this.postData(this.accountInterface.bindNewAccount, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err)
                })
        });
    }

    /**
     * 统一请求方法
     * @param url ｛string｝ 请求地址
     * @param data {object} 请求参数
     * @returns {Promise<TResult>}
     * @private
     */
    private postData(url: string, data ?: any): Promise < any > {
        if (typeof data != "string") {
            data = JSON.stringify(data)
        }
        console.log("请求地址:", url, "参数:", typeof data);
        let promise = new Promise<any>((resolve, reject) => {
            this.http
                .post(url, data, {headers: this.headers})
                .toPromise()
                .then(res => {
                    let result = res.json();
                    result.retCode == "0000" ? resolve(result) : reject(result);
                }, (err) => {
                    reject(err);
                })
                .catch((err) => reject(err));
        });
        return promise;
    }
}

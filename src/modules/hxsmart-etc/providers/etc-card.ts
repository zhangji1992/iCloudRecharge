import {Injectable} from "@angular/core";
import {EtcCardRequest} from "./etc-card-request";
import {ToastController, LoadingController, AlertController} from "ionic-angular";
import {interfaceUrl} from '../../../../src/providers/serverUrl';

@Injectable()
export class EtcCard {
    //etc卡片简易列表
    etcCardList: any[] = [];
    //充值记录列表
    rechargeRecordsList: any[] = [];
    //用户的二类账户列表
    payChannelList: any[] = [];
    //充值账户
    rechargeAccount = {
        accountTypeName: '',        //确定付款账户名称
        payChannelCode: '',         //确定付款渠道
        payAccountId: '',           //确定付款账户id
        feeRedix: ''                //确定付款账户费率
    };

    constructor(public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public alertCtrl: AlertController,
                private request: EtcCardRequest) {
    }

    /**
     * 设置账户的费率，同时设置为非默认支付方式
     * @param arr1
     * @param arr2
     * @returns {any}
     * @private
     */
    private _setRate(arr1, arr2): any[] {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i].IsDefault = 0;
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i].payChannelCode == arr2[j].payChannelCode) {
                    if (arr2[j].ModulePayRate.length != 0) {
                        arr1[i].feeRedix = arr2[j].ModulePayRate[0].feeRedix;
                    } else {
                        arr1[i].feeRedix = 0;
                    }
                }
            }
        }
        return arr1;
    };

    /**
     * 获取默认支付渠道，当有多个默认支付渠道时，取第一个默认支付渠道
     * @param arr
     * @returns {string|any}
     * @private
     */
    private _getDefaultPayChannelCode(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].IsDefault) {
                return arr[i].payChannelCode;
            }
        }
    }

    /**
     * 根据默认支付渠道代码设置默认支付账户
     * @param arr
     * @param string
     * @returns {any}
     * @private
     */
    private _setDefaultPayAccount(arr, string) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].payChannelCode == string) {
                arr[i].IsDefault = 1;
                console.log(arr);
                return arr;
            }
        }
    }

    /**
     * 把默认支付账户移到数组第一位
     * @param arr
     * @returns {any}
     * @private
     */
    private _getPayChannelList(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].IsDefault == 1) {
                arr.unshift(arr[i]);
                arr.splice(i + 1, 1);
            }
        }
        return arr;
    };

    /**
     * 吐丝
     * @param msg {string} 吐丝信息
     */
    toast(msg: string): void {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }

    /**
     * loading效果
     * @param msg {string} 提示信息
     */
    loading(msg: string): any {
        let loader = this.loadingCtrl.create({
            content: msg,
        });
        loader.present();
        return loader;
    }

    /**
     * 弹窗
     * @param title
     * @param msg
     * @param buts
     */
    alert(title, msg, buts) {
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: buts
        });
        alert.present()
    };

    /**
     * 获取ETC卡片详情
     * @param param
     * @returns {Promise<any>}
     */
    getEtcDetails(param: any) {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.getEtcDetails, param)
                .then(data => {
                    console.log('getEtcDetails', data);

                    //成功：下一步
                    if (data.retCode == 'cardNotExist') {
                        //反填手机号
                        if (data.context) {
                            resolve(data.context.Phone);
                        } else {
                            resolve('');
                        }
                    } else {
                        reject(data.retMsg || '卡号已存在，请重新输入');
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }

    /**
     * 绑定ETC卡片
     * @param param
     * @returns {Promise<T>}
     */
    bindEtc(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.bindEtc, param)
                .then(data => {

                    //更新模型数据
                    if (data.retCode == '0000') {
                        let _param = {
                            ClientPartyId: param.ClientPartyId,
                            ClientStatus: '1'
                        };
                        this.getBoundEtc(_param);
                        resolve();
                    } else {
                        console.log('err', data);
                        reject(data.retMsg || '绑定ETC失败');
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }

    /**
     * 获取已绑定的ETC卡片
     * @param param
     * @returns {Promise<T>}
     */
    getBoundEtc(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.getBoundEtc, param)
                .then(data => {
                    // console.log('getBoundEtc', data);

                    //更新模型数据
                    this.etcCardList = [];
                    if (data.retCode == '0000') {
                        this.etcCardList = data.context;
                        resolve();
                    } else {
                        console.log('err', data);
                        reject(data.retMsg || '获取绑定ETC列表失败');
                    }
                })
                //postMethod方法报错或其他
                .catch(err => console.log('err', err));
        })
    }

    /**
     * 解绑ETC卡片
     * @param param
     * @returns {Promise<T>}
     */
    unBindEtc(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.unBindEtc, param)
                .then(data => {
                    //更新模型数据
                    if (data.retCode == '0000') {
                        let _param = {
                            ClientPartyId: param.ClientPartyId,
                            ClientStatus: '1'
                        };

                        //刷新卡片列表
                        this.getBoundEtc(_param);
                        //成功提示
                        this.toast('ETC卡解绑成功');

                        resolve(data.retMsg || 'ETC卡解绑成功');
                    } else {
                        reject(data.retMsg || 'ETC解绑失败');
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }

    /**
     * 获取ETC模块可用账户类型
     * @param param
     * @returns {Promise<T>}
     */
    getAvailablePayAccountTypes(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.getAvailablePayAccountTypes, param)
                .then(data => {
                    //业务成功
                    if (data.retCode == '0000') {
                        resolve(data);
                    }
                    //业务失败
                    else {
                        reject(data.retMsg || data);
                    }
                })
                //postMethod方法报错或通信失败
                .catch(err => reject(err.message || err));
        });
    }

    /**
     * 获取ETC模块可用账户
     * @param param
     * @returns {Promise<T>}
     */
    getAvailableAccount(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.getAvailableAccount, param)
                .then(data => {
                    //业务成功
                    if (data.retCode == '0000') {
                        resolve(data);
                    }
                    //业务失败
                    else {
                        reject(data.retMsg || data);
                    }
                })
                //postMethod方法报错或通信失败
                .catch(err => reject(err.message || err));
        });
    }

    /**
     * 获取并构造支付渠道列表
     * @param param
     * @returns {Promise<T>}
     */
    getPayChannelList(param: any): Promise<any> {
        let defaultPayChannelCode: string = ''; //默认支付渠道
        let defaultPayAccount: any[] = [];      //后台返回的支付账户列表

        let tempParam = {
            ModuleCode: param.ModuleCode
        };
        return new Promise((resolve, reject) => {
            this.getAvailablePayAccountTypes(tempParam)
                .then(data1 => {
                    console.log('getAvailablePayAccountTypes', data1);

                    //获取可用账户类型列表成功
                    if (data1.retCode == '0000') {

                        //设置默认支付渠道
                        defaultPayChannelCode = this._getDefaultPayChannelCode(data1.context);
                        // console.log('defaultPayChannelCode', defaultPayChannelCode);

                        this.getAvailableAccount(param)
                            .then(data2 => {
                                console.log('getAvailableAccount', data2);

                                //获取可用账户成功
                                if (data2.retCode == '0000') {
                                    console.log('in');

                                    if (data2.context.length == 0) {
                                        resolve(this.payChannelList);
                                    } else {
                                        //获取支付账户列表
                                        defaultPayAccount = data2.context;

                                        //改造一：设置费率
                                        defaultPayAccount = this._setRate(defaultPayAccount, data1.context);
                                        // console.log('defaultPayAccount', defaultPayAccount);
                                        //改造二：设置默认支付账户
                                        defaultPayAccount = this._setDefaultPayAccount(defaultPayAccount, defaultPayChannelCode);

                                        //改造三：默认账户移到数组第一位
                                        this.payChannelList = this._getPayChannelList(defaultPayAccount);

                                        // console.log('this.payCannelList', this.payChannelList);

                                        //确定默认付款账户信息
                                        this.rechargeAccount = {
                                            accountTypeName: this.payChannelList[0].accountTypeName,//确定付款账户名称
                                            payChannelCode: this.payChannelList[0].payChannelCode,//确定付款渠道
                                            payAccountId: this.payChannelList[0].accountId,//确定付款账户id
                                            feeRedix: this.payChannelList[0].feeRedix//确定付款账户费率
                                        };
                                        resolve(this.payChannelList);
                                    }
                                }
                                //获取可用账户失败
                                else {
                                    // console.log('err happer');
                                    this.payChannelList = [];
                                    reject(data2.retMsg || data2);
                                }
                            })
                            //postMethod方法报错或其他
                            .catch(err => reject(err.message || err));
                    } else {
                        console.log('err2 happen');
                        this.payChannelList = [];
                        reject(data1.retMsg || data1);
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }

    /**
     * 充值ETC卡片
     * @param param
     * @returns {Promise<T>}
     */
    rechargeEtc(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.rechargeEtc, param)
                .then(data => {
                    console.log('rechargeEtc', data);

                    //业务成功
                    if (data.retCode == '0000') {
                        //成功提示
                        this.toast('ETC储值卡充值成功');

                        resolve(data);
                    }
                    //业务失败
                    else {
                        reject(data.retMsg || data);
                    }
                })
                //postMethod方法报错或通信失败
                .catch(err => reject(err.message || err));
        });
    }

    /**
     * 查询ETC卡片充值详情
     * @param param
     * @returns {Promise<T>}
     */
    getEtcRechargeDetails(param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.getEtcRechargeDetails, param)
                .then(data => {
                    // console.log('getEtcRechargeDetails', data);
                    //业务成功
                    if (data.retCode == '0000') {
                        //当前页为第一页
                        if (param.PageIndex == 0) {
                            this.rechargeRecordsList = data.context;
                            resolve(this.rechargeRecordsList);
                        }
                        //当前页不为第一页
                        else {
                            this.rechargeRecordsList = this.rechargeRecordsList.concat(data.context);
                            resolve(this.rechargeRecordsList);
                        }
                    }
                    //业务失败
                    else {
                        this.rechargeRecordsList = [];
                        reject(data.retMsg || data);
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }

    /**
     * ETC撤销充值
     * @param param
     * @param i
     * @returns {Promise<T>}
     */
    orderRefund(param: any, i: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request.postMethod(interfaceUrl.orderRefund, param)
                .then(data => {
                    console.log('orderRefund', data);
                    if (data.retCode == '0000') {
                        this.rechargeRecordsList[i].orderStatus = '6';
                        resolve();
                    } else {
                        reject(data.retMsg || data);
                    }
                })
                //postMethod方法报错或其他
                .catch(err => reject(err.message || err));
        })
    }
}

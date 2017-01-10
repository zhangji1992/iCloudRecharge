import {Injectable} from '@angular/core';
import {LoadingController, ToastController, AlertController, ModalController} from 'ionic-angular';
import {CompusCardRequest} from './compus-card-request';
import {CompusCardInterface} from './compus-card-interface';
import {User} from '../../../modules/hxsmart-user/providers/user';
import {HxsmartSecurity} from '../../hxsmart-native/providers/plugins/hxsmart-security';

@Injectable()
export class CompusCard {
    userID: any;
    chargeList: any[];
    cardEasyList: any[];
    addCompusCardPost: any = {
        ClientPartyId: "",
        SupplierPartyId: "",
        CardNo: "",
        Clazz: "",
        GuardianName: "",
        GuardianPhone: "",
        HoldClientNname: ""
    };
    addCompusCardPage: any = {
        name: "",
        state: "",
        school: "",
        class: "",
        cardNo: "",
        parent: "",
        phone1: "",
        phone2: ""
    };

    setUserID() {
        this.userID = this.user.getUserInfo().id;
    }

    setAddCompusCard(obj) {
        let self = this;
        self.addCompusCardPost.ClientPartyId = this.user.getUserInfo().id;

        //self.addCompusCardPost.SupplierPartyId = obj.supplierPartyId;
        //self.addCompusCardPost.CardNo = obj.CardNo;
        self.addCompusCardPost.Clazz = obj.clazz;
        self.addCompusCardPost.GuardianName = obj.GuardianName;
        self.addCompusCardPost.GuardianPhone = obj.GuardianCellPhone;
        self.addCompusCardPost.HoldClientNname = obj.HoldName;

        self.addCompusCardPage.name = obj.HoldName;
        self.addCompusCardPage.state = obj.GlientStatus;
        //self.addCompusCardPage.cardNo = obj.CardNo;
        self.addCompusCardPage.class = obj.clazz;
        self.addCompusCardPage.parent = obj.GuardianName;
        self.addCompusCardPage.phone1 = obj.StudentPhone;
        self.addCompusCardPage.phone2 = obj.GuardianCellPhone;

        // self.addCompusCardPost.ClientPartyId = obj.cardInfo.clientPartyId;
        // self.addCompusCardPost.SupplierPartyId = obj.cardInfo.supplierPartyId;
        // self.addCompusCardPost.CardNo = obj.cardInfo.clinetNo;
        // self.addCompusCardPost.Clazz = obj.schoolInfo.class1;
        // self.addCompusCardPost.GuardianName = obj.schoolInfo.guardianName;
        // self.addCompusCardPost.GuardianPhone = obj.schoolInfo.guardianCellPhone;
        // self.addCompusCardPost.HoldClientNname = obj.schoolInfo.holdClientName;
        //
        // self.addCompusCardPage.name = obj.schoolInfo.holdClientName;
        // self.addCompusCardPage.state = obj.cardInfo.clientStatus;
        // self.addCompusCardPage.cardNo = obj.cardInfo.clinetNo;
        // self.addCompusCardPage.class = obj.schoolInfo.class1;
        // self.addCompusCardPage.parent = obj.schoolInfo.guardianName;
        // self.addCompusCardPage.phone2 = obj.schoolInfo.guardianCellPhone;
    };

    //支付方式
    compusPayMethod: any = {
        "accountTypeName": "",
        "payChannelCode": "",
        "accountNo": ""
    };

    setCompusPayMethod(obj) {
        this.compusPayMethod.accountTypeName = obj.accountTypeName;
        this.compusPayMethod.payChannelCode = obj.payChannelCode;
        this.compusPayMethod.accountNo = obj.accountId;
    };

    constructor(public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public alerCtrl: AlertController,
                public modalCtrl: ModalController,
                public compusCardRequest: CompusCardRequest,
                public compusCardInterface: CompusCardInterface,
                public user: User,
                public security: HxsmartSecurity) {
    }

    //查询账户信息
    getAccountInfo(sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('getInfo');
        let param = {"partyId": self.userID};
        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            loading.dismiss();
            if (data.retCode === '0000') {
                sucFun(data);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        });
    };

    //查询所有学校,参数Campus
    getAllCompus(sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('allCampus');
        let param = {"ModuleCode": 'Campus'};//Campus
        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            loading.dismiss();
            if (data.retCode === '0000') {
                sucFun(data.context);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    //校园卡详情不登录
    compusCardDet1(str, sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('compusCardDetail1');
        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, {CardNo: str}).then(function (data) {
            loading.dismiss();
            if (data.retCode === '0000') {
                console.log(data);
                self.setAddCompusCard(data.context);
                sucFun();
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    //查询校园卡详情
    /*{
     "ClientPartyId":"61",//当前登录用户的partyId
     "CardNo":"131420"//CardNo校园卡卡号
     }*/
    compusCardDet(str, sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('compusCardDetail');

        self.compusCardRequest.postMethod(url, {
            "ClientPartyId": self.user.getUserInfo().id,//当前登录用户的partyId
            "CardNo": str//CardNo校园卡卡号
        }).then(function (data) {
            if (data.retCode === '0000') {
                console.log(data);
                self.setAddCompusCard(data.context);
                sucFun(data);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            self.showAlert('提示', err, ['确定']);
        })
    };

    //绑定校园卡
    bindCompusCard(sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('bindCompusCard');
        let param = self.addCompusCardPost;
        console.log(param);
        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            loading.dismiss();
            console.log(data);
            if (data.retCode === '0000') {
                sucFun();
                self.cardEasyList = data.context;
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    //获取应用可用支付账户compusPayWay
    compusPayWay(sucFun) {
        let self = this;
        let url = self.compusCardInterface.getUrl('compusPayWay');
        let param = {"ModuleCode": 'Campus'};//Campus
        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            loading.dismiss();
            if (data.retCode === '0000') {
                if (data.length == 0) {
                    self.showAlert('提示', '校园卡模块不支持任何支付渠道，请联系商家解决问题', ['确定'])
                } else {
                    sucFun(data.context);
                }
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    compusOrederObj = {
        PayAccountId: "",//支付账户ID
        PurchaseOrderPartyId: "",//用户partyId
        SupplierPartyId: "",//可不填写供应订单当事人Id
        TotalAmount: "",//订单总额
        PayChannelCode: "",//支付渠道代码
        OrderItems: [
            {
                ProductId: "3",//产品ID
                Quantity: "1",//数量
                UnitPrice: "",//单价
                ItemDesc: "",//描述
                SupplierClientId: ""//充值卡id
            }]
    };

    setOrderObj(obj) {
        this.compusOrederObj.PurchaseOrderPartyId = obj.ClientPartyId;
        this.compusOrederObj.SupplierPartyId = obj.SupplierPartyId;
        this.compusOrederObj.TotalAmount = obj.chargeNum;
        this.compusOrederObj.PayChannelCode = obj.chargeWayNum;
        this.compusOrederObj.OrderItems[0].UnitPrice = obj.chargeNum;
        this.compusOrederObj.OrderItems[0].SupplierClientId = obj.SupplierClientId;
        this.compusOrederObj.PayAccountId = this.compusPayMethod.accountNo;
    };

    //校园卡充值下订单compusOrder
    /*{
     PurchaseOrderPartyId: "28",//用户partyId
     SupplierPartyId: "",//可不填写供应订单当事人Id
     TotalAmount: "100",//订单总额
     PayChannelCode: "CGBAcc",//支付渠道代码
     OrderItems:[
     {
     ProductId: "3",//产品ID
     Quantity: "1",//数量
     UnitPrice: "100",//单价
     ItemDesc: "",//描述
     SupplierClientId: "2"//充值卡id
     }]
     }*/
    compusOrder(obj, sucFun) {
        let self = this;
        self.setOrderObj(obj);
        let url = self.compusCardInterface.getUrl('compusOrder');
        console.log(url);
        console.log(self.compusOrederObj);

        let loading = self.loadingCtrl.create();
        loading.present();
        self.compusCardRequest.postMethod(url, self.compusOrederObj).then(function (data) {
            loading.dismiss();
            if (data.retCode === '0000') {
                console.log(data);
                self.setcompusPayObj(data.context.Order);
                console.log(self.compusPayObj);
                sucFun();
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    compusPayObj = {
        "OrderId": "",
        "PayOrderPartyId": "",
        "PayAccountId": "",
        "payPwd": ""
    };

    setcompusPayObj(obj) {
        console.log(obj);
        this.compusPayObj.OrderId = obj.orderId;
        this.compusPayObj.PayOrderPartyId = obj.payOrderPartyId;
        if (obj.hasOwnProperty('payAccountId')) {
            this.compusPayObj.PayAccountId = obj.payAccountId;
        } else {
            this.compusPayObj.PayAccountId = this.compusPayMethod.accountNo;
        }

    };

    //校园卡充值订单支付compusPay
    /*{
     订单号	OrderId
     订单支付当事人Id	PayOrderPartyId
     订单支付账户的id	PayAccountId
     }*/
    compusPaySec() {
        let promise = new Promise((resolve, reject) => {
            this.security.inputPwd({type: 2})
                .then(
                    (data) => {
                        // this.compusPayObj.payPwd=data;
                        this.compusOrderAndPayObj.payPwd = data;
                        this.security.encryptObject(this.compusOrderAndPayObj)
                            .then(
                                (res2) => {
                                    let loading = this.loadingCtrl.create();
                                    loading.present();
                                    this.compusPay(res2)
                                        .then(
                                            (res3) => {
                                                loading.dismiss();
                                                resolve(res3)
                                            },
                                            (err3) => {
                                                loading.dismiss();
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

    compusPay(param: any): Promise<any> {
        //let url =this.compusCardInterface.getUrl('compusPay');
        let url = this.compusCardInterface.getUrl('compusOrderAndPay');
        return new Promise<any>((resolve, reject) => {
            this.compusCardRequest.postMethod(url, param)
                .then((res) => {
                    console.log(res);
                    if (res.retCode == "0000") {
                        resolve(1);
                    } else {
                        resolve(res.retMsg);
                    }
                }, (err) => {
                    if (err.retMsg) reject(err.retMsg);
                    else reject(err);
                })
        });
    }

    // compusPay(sucFun) {
    //     let self = this;
    //     console.log(self.compusPayObj);
    //     let url = self.compusCardInterface.getUrl('compusPay');
    //
    //     let loading = self.loadingCtrl.create();
    //     loading.present();
    //     self.compusCardRequest.postMethod(url, self.compusPayObj).then(function (data) {
    //         loading.dismiss();
    //         if (data.retCode === '0000') {
    //             console.log(data);
    //             sucFun(data);
    //         } else {
    //             self.showAlert('提示', data.retMsg, ['确定']);
    //         }
    //     }, function (err) {
    //         loading.dismiss();
    //         self.showAlert('提示', err, ['确定']);
    //     })
    // };


    /*
     * 校园卡下订单支付接口合并compusOrderAndPay
     * param
     * {
     *   PurchaseOrderPartyId:"",//下订单当事人
     *   SupplierPartyId:"",//供应订单当事人Id
     *   TotalAmount:"",//订单总额
     *   PayChannelCode:"",//支付渠道代码
     *   PayOrderPartyId:"",//支付订单当事人id
     *   PayAccountId:"",//支付账户的id
     *   payPwd:"",//支付密码(加密)
     *   ModuleCode:"",//应用模块代码Campus
     *   OrderItems:[
     *       {
     *           ProductId:"",//产品ID
     *           Quantity:"",//数量
     *           UnitPrice:"",//单价
     *           ItemDesc:"",//描述
     *           SupplierClientId:"",//充值卡记录的id
     *       }
     *   ]
     * }
     * */
    compusOrderAndPayObj = {
        "PurchaseOrderPartyId": "",
        "SupplierPartyId": "",
        "TotalAmount": "",
        "PayChannelCode": "",
        "PayOrderPartyId": "",
        "PayAccountId": "",
        "ModuleCode": "Campus",
        "payPwd": "",
        "OrderItems": [
            {
                ProductId: "3",
                Quantity: "1",
                UnitPrice: "",
                ItemDesc: "",
                SupplierClientId: ""
            }
        ]
    };

    setOrderAndPayObj(obj) {
        this.compusOrderAndPayObj.PurchaseOrderPartyId = obj.ClientPartyId;
        this.compusOrderAndPayObj.PayOrderPartyId = obj.ClientPartyId;
        this.compusOrderAndPayObj.SupplierPartyId = obj.SupplierPartyId;
        this.compusOrderAndPayObj.TotalAmount = obj.chargeNum;
        this.compusOrderAndPayObj.PayChannelCode = obj.chargeWayNum;
        this.compusOrderAndPayObj.PayAccountId = this.compusPayMethod.accountNo;
        this.compusOrderAndPayObj.OrderItems[0].UnitPrice = obj.chargeNum;
        this.compusOrderAndPayObj.OrderItems[0].SupplierClientId = obj.SupplierClientId;
    };

    //查询已绑定校园卡
    getBindCompusCard() {
        let self = this;
        let url = self.compusCardInterface.getUrl('getBindCompusCard');
        let param = {
            "ClientPartyId": self.user.getUserInfo().id,
            "ClientStatus": "1"
        };
        console.log(param);
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            console.log(2222, data);
            if (data.retCode === '0000') {
                self.cardEasyList = data.context;
            } else {

            }
        }, function (err) {
            console.log(111111111111, err);
        })
    };

    //撤销写卡
    cancleWriteCard(partyId, orderId, index) {

        let self = this;
        let PurchaseOrderPartyId = partyId.toString();
        console.log(PurchaseOrderPartyId, orderId);
        let url = self.compusCardInterface.getUrl('cancleWriteCard');
        let param = {
            "PurchaseOrderPartyId": PurchaseOrderPartyId,
            "OrderId": orderId
        };
        let loading = self.loadingCtrl.create();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            console.log(data);
            if (data.retCode === '0000') {
                self.chargeList[index].orderStatus = '已撤销订单';
                console.log('11111111111111', self.chargeList);
                loading.dismiss();
                self.showAlert("", "撤销成功", ['确定']);
            } else {
                loading.dismiss();
                self.showAlert("", "撤销失败", ['确定']);
            }
        }, function (err) {
            console.log(err);
            loading.dismiss();
            self.showAlert("", err, ['确定']);
        })
    };

    //申请退款
    applyBackMoney(orderId, index) {
        let self = this;
        let url = self.compusCardInterface.getUrl('applyBackMoney');
        console.log(orderId);
        let param = {
            "OrderId": orderId
        };
        let loading = self.loadingCtrl.create();
        self.compusCardRequest.postMethod(url, param).then(function (data) {
            console.log(data);
            if (data.retCode === '0000') {
                self.chargeList[index].orderStatus = '退款完成';
                console.log('11111111111111', self.chargeList);
                loading.dismiss();
                self.showAlert("", "申请成功", ['确定']);
            } else {
                loading.dismiss();
                self.showAlert("", "申请失败", ['确定']);
            }
        }, function (err) {
            console.log(err);
            loading.dismiss();
            self.showAlert("", err, ['确定']);
        })
    };

    //取消卡绑定
    cancleBindCard(CardNo, partyId) {
        let self = this;
        let url = self.compusCardInterface.getUrl('cancleBindCard');
        let param = {
            "CardNo": CardNo,
            "ClientPartyId": partyId
        };
        let loading = self.loadingCtrl.create();
        return new Promise<any>((resolve, reject) => {
            self.compusCardRequest.postMethod(url, param).then(function (data) {
                loading.dismiss();
                resolve(data);
            }, function (err) {
                loading.dismiss();
                reject(err);
            })
        });


    };

    //查询校园充值记录
    compusChargeList(partyId, SupplierClientId, pageIndex, pageSize = '4') {
        let self = this;
        let page = pageIndex.toString();
        console.log('我是第', page, '页', SupplierClientId);
        let obj = {
            "partyId": partyId,
            "SupplierClientId": SupplierClientId,
            "PageIndex": page,
            "PageSize": pageSize
        };
        console.log(obj);
        let changeStatus = function (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderStatus == '1') {
                    list[i].orderStatus = "未支付";
                }
                else if (list[i].orderStatus == '2') {
                    list[i].orderStatus = "已撤销订单";
                }
                else if (list[i].orderStatus == '3') {
                    list[i].orderStatus = "等待交付";
                }
                else if (list[i].orderStatus == '4') {
                    list[i].orderStatus = "支付完成";
                }
                else if (list[i].orderStatus == '5') {
                    list[i].orderStatus = "申请退款";
                }
                else if (list[i].orderStatus == '6') {
                    list[i].orderStatus = "退款完成";
                }
                else {
                    list[i].orderStatus = "状态不明";
                }
            }
            return list;
        };
        let url = self.compusCardInterface.getUrl('compusChargeList');
        self.compusCardRequest.postMethod(url, obj).then(function (data) {
            if (data.retCode === '0000') {
                console.log('fenye', data);
                if (pageIndex == 0) {
                    self.chargeList = changeStatus(data.context);
                } else {
                    self.chargeList = self.chargeList.concat(changeStatus(data.context));
                }
            } else {

            }
        }, function (err) {
            console.log(err);
        })
    };

    //查询校园消费记录
    compusConsumeList(cardNo, pageIndex, startData, endData, pageSize = '4') {
        console.log('i am ddd', pageIndex);
        let self = this;
        let page = pageIndex.toString();
        let obj = {
            "CardNo": cardNo,
            "FromDate": startData,
            "ToDate": endData,
            "PageIndex": page,
            "PageSize": pageSize
        };
        let url = self.compusCardInterface.getUrl('compusConsumeList');
        self.compusCardRequest.postMethod(url, obj).then(function (data) {
            if (data.retCode === '0000') {
                console.log('consume', data);
                if (pageIndex == 0) {
                    self.chargeList = data.context;
                } else {
                    self.chargeList = self.chargeList.concat(data.context);
                }
            } else {

            }
        }, function (err) {
            console.log(err);
        })
    };


    showToast(str) {
        let toast = this.toastCtrl.create({
            message: str,
            showCloseButton: true,
            position: "middle",
            closeButtonText: '确定',
            duration: 3000
        });
        toast.present();
    };

    showAlert(title, msg, buts) {
        let alert = this.alerCtrl.create({
            title: title,
            message: msg,
            buttons: buts
        });
        alert.present()
    };

    showModal(page, param) {
        let modal = this.modalCtrl.create(page, param);
        modal.present();
    };
}

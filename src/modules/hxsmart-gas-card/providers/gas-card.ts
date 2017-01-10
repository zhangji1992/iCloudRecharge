import {Injectable} from '@angular/core';
import {LoadingController, ToastController, AlertController, ModalController} from "ionic-angular";
import {GasCardRequest} from './gas-card-request';
import {User} from '../../../modules/hxsmart-user/providers/user';
import {interfaceUrl} from "../../../providers/serverUrl";
import {HxsmartSecurity} from '../../hxsmart-native/providers/plugins/hxsmart-security';


@Injectable()
export class GasCard {
    userID: any;
    gasCardList: any[];
    gasCardChargeDetail: any[];
    gasPriceStep: any;
    addGasCardPost: any = {
        ClientPartyId: "",//当前用户ID
        SupplierPartyId: "",//燃气公司当事人ID
        CardNo: "",
        gasCompany: "",
        GuardianName: "",
        GuardianPhone: "",
    };

    constructor(private gasCardRequest: GasCardRequest,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public alerCtrl: AlertController,
                public modalCtrl: ModalController,
                private user: User,
                public security: HxsmartSecurity) {
        this.userID = this.user.getUserInfo().id;
    }

    //支付方式
    gasPayMethod: any = {
        "orderId": "",
        "accountTypeName": "",
        "payChannelCode": "",
        "accountNo": ""
    };

    setGasPayMethod(obj) {
        this.gasPayMethod.accountTypeName = obj.accountTypeName;
        this.gasPayMethod.payChannelCode = obj.payChannelCode;
        this.gasPayMethod.accountNo = obj.accountId;
    };

    //查询订单详细信息
    getOrderDetail(carNo, accountId, sucFun) {
        let self = this;
        let url = interfaceUrl.getOrderDetail;
        let param = {
            "OrderId": carNo,
            "AccountId": accountId
        };
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            if (data.retCode === '0000') {
                sucFun(data);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            self.showAlert('提示', err, ['确定']);
        });
    };

    //查询卡是否已绑定
    cardIsBind(carNo, sucFun) {
        let self = this;
        let url = interfaceUrl.gasCardIsBind;
        let param = {"CardNo": carNo};
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            if (data.retCode === '0000') {
                sucFun(data);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            self.showAlert('提示', err, ['确定']);
        });
    };

    //查询账户信息
    getAccountInfo(sucFun) {
        let self = this;
        let url = interfaceUrl.getAccountInfo;
        let param = {"partyId": self.userID};
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            if (data.retCode === '0000') {
                sucFun(data);
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            self.showAlert('提示', err, ['确定']);
        });
    };

    //查询燃气卡列表
    getGasCardList(str) {
        let self = this;
        let url = interfaceUrl.getBindzGasCard;
        let param = {
            "ClientPartyId": str,
            "ClientStatus": "1"
        };
        console.log(param);

        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log(2222, data);
            if (data.retCode === '0000') {
                self.gasCardList = data.context;
            } else {

            }
        }, function (err) {
            console.log(111111111111, err);
        })
    };

    //查询所有燃气公司
    getAllGasCompany(sucFun) {
        let self = this;
        let url = interfaceUrl.allGasCompany;
        let param = {"ModuleCode": 'Gas'};
        console.log(param);
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log('燃气', data);
            if (data.retCode === '0000') {
                sucFun(data.context);
            } else {

            }
        }, function (err) {
            console.log(111111111111, err);
        })
    };

    //绑定燃气卡
    bindGasCard(ClientPartyId, SupplierPartyId, carNO, sucFun) {
        let self = this;
        let url = interfaceUrl.bindGasCard;
        let param = {
            "ClientPartyId": ClientPartyId,
            "SupplierPartyId": SupplierPartyId,
            "GasCardNo": carNO
        };
        console.log(param);
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log('绑定燃气卡', data);
            if (data.retCode === '0000') {
                let alert = self.alerCtrl.create({
                    title: '提示',
                    message: data.retMsg,
                    buttons: [{
                        text: '确定',
                        handler: () => {
                            sucFun(data.context);
                        }
                    }]
                });
                alert.present();
            } else {
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            console.log(111111111111, err);
        })
    };

    //查询燃气卡阶梯
    getGasPriceStep(carNO) {
        let self = this;
        let url = interfaceUrl.gasPriceStep;
        let param = {
            "SupplierClientId": carNO
        };
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log('查询燃气卡阶梯', data);
            if (data.retCode === '0000') {
                self.gasPriceStep = data.context;
            } else {
                console.log(data);
            }
        }, function (err) {
            console.log(err);
        })
    };

    //解除绑定燃气卡
    cancleBindCard(carNO, SupplierPartyId, sucFun) {
        let self = this;
        let url = interfaceUrl.cancleBindCard;
        let param = {
            "GasCardNo": carNO,
            "ClientPartyId": SupplierPartyId
        };
        console.log(param);
        let loading = self.loadingCtrl.create();
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log('解除绑定燃气卡', data);
            if (data.retCode === '0000') {
                let alert = self.alerCtrl.create({
                    title: '提示',
                    message: data.retMsg,
                    buttons: [{
                        text: '确定',
                        handler: () => {
                            sucFun(data.context);
                        }
                    }]
                });
                loading.dismiss();
                alert.present();
            } else {
                loading.dismiss();
                self.showAlert('提示', data.retMsg, ['确定']);
            }
        }, function (err) {
            loading.dismiss();
            self.showAlert('提示', err, ['确定']);
        })
    };

    //获取燃气卡支付方式
    gasPayWay(sucFun) {
        let self = this;
        let url = interfaceUrl.gasPayWay;
        let param = {"ModuleCode": 'Campus'};//Campus
        self.gasCardRequest.postMethod(url, param).then(function (data) {
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
            self.showAlert('提示', err, ['确定']);
        })
    };

    //燃气卡充值下订单compusOrder
    /*gasOrder(SupplierClientId,SupplierPartyId,TotalAmountm,gasNum,sucFun) {
     let self = this;
     let gasOrderParam = {
     PayAccountId:self.gasPayMethod.accountNo,
     PurchaseOrderPartyId: self.userID,//用户partyId
     SupplierPartyId: SupplierPartyId,//可不填写供应订单当事人Id
     TotalAmount: TotalAmountm,//订单总额
     PayChannelCode: self.gasPayMethod.payChannelCode,//支付渠道代码
     OrderItems: [
     {
     ProductId: "3",//产品ID
     Quantity: gasNum,//数量
     UnitPrice: "",//单价
     ItemDesc: "",//描述
     SupplierClientId: SupplierClientId//充值卡id
     }]
     };
     console.log('canshu',gasOrderParam);
     let url = interfaceUrl.gasOrder;

     self.gasCardRequest.postMethod(url,gasOrderParam).then(function (data) {
     if (data.retCode === '0000') {
     console.log('下订单',data);
     self.gasPayMethod.orderId=data.context.Order.orderId;
     sucFun();
     } else {
     self.showAlert('提示', data.retMsg, ['确定']);
     }
     }, function (err) {
     self.showAlert('提示', err, ['确定']);
     })
     };*/
    //燃气卡充值订单支付compusPay
    /* gasOrderPay(sucFun) {
     let self = this;
     let url = interfaceUrl.gasOrderPay;
     let param={
     "OrderId":self.gasPayMethod.orderId,//订单号
     "PayOrderPartyId":this.userID,//订单支付当事人Id
     "PayAccountId":self.gasPayMethod.accountNo//订单支付账户的id
     };

     self.gasCardRequest.postMethod(url, param).then(function (data) {
     console.log('nihao',param);
     if (data.retCode === '0000') {
     console.log(data);
     self.gasPayMethod = {
     "orderId":"",
     "accountTypeName": "",
     "payChannelCode": "",
     "accountNo":""
     };
     sucFun(data);
     } else {
     self.showAlert('提示', data.retMsg, ['确定']);
     }
     }, function (err) {
     self.showAlert('提示', err, ['确定']);
     })
     };*/
    //查询燃气卡充值明细
    getChargeList(SupplierClientId, PageIndex) {
        let self = this;
        let url = interfaceUrl.gasChargeList;
        let size = PageIndex.toString();
        let param = {
            "partyId": self.userID,
            "SupplierClientId": SupplierClientId,
            "PageIndex": size,
            "PageSize": "4",
            "DevilerStatus ": ""

        };
        console.log('param', param);
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
        console.log(param);
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log(2222, data);
            if (data.retCode === '0000') {
                if (PageIndex == 0) {
                    self.gasCardChargeDetail = changeStatus(data.context);
                } else {
                    self.gasCardChargeDetail = self.gasCardChargeDetail.concat(changeStatus(data.context));
                }
            } else {

            }
        }, function (err) {
            console.log(111111111111, err);
        })
    };

    //取消订单
    cancleOrder(partyId, orderId, index) {

        let self = this;
        let PurchaseOrderPartyId = partyId.toString();
        console.log(PurchaseOrderPartyId, orderId);
        let url = interfaceUrl.cancleWriteCard;
        let param = {
            "PurchaseOrderPartyId": PurchaseOrderPartyId,
            "OrderId": orderId
        };
        let loading = self.loadingCtrl.create();
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log(data);
            if (data.retCode === '0000') {
                self.gasCardChargeDetail[index].orderStatus = '已撤销订单';
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
        let url = interfaceUrl.applyBackMoney;
        let param = {
            "OrderId": orderId
        };
        let loading = self.loadingCtrl.create();
        self.gasCardRequest.postMethod(url, param).then(function (data) {
            console.log(data);
            if (data.retCode === '0000') {
                self.gasCardChargeDetail[index].orderStatus = '退款完成';
                //console.log('11111111111111', self.chargeList);
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

    compusPaySec(SupplierPartyId, TotalAmountm, gasNum, SupplierClientId) {
        let self = this;
        let promise = new Promise((resolve, reject) => {
            this.security.inputPwd({type: 2})
                .then(
                    (data) => {
                        let param = {
                            PurchaseOrderPartyId: self.userID,//用户partyId
                            SupplierPartyId: SupplierPartyId,//可不填写供应订单当事人Id
                            TotalAmount: TotalAmountm,//订单总额
                            PayChannelCode: self.gasPayMethod.payChannelCode,//支付渠道代码
                            PayOrderPartyId: self.userID,//订单支付当事人Id
                            PayAccountId: self.gasPayMethod.accountNo,//订单支付账户的id
                            payPwd: data,
                            ModuleCode: "Gas",
                            OrderItems: [
                                {
                                    ProductId: "3",//产品ID
                                    Quantity: gasNum,//数量
                                    UnitPrice: "",//单价
                                    ItemDesc: "",//描述
                                    SupplierClientId: SupplierClientId//充值卡id
                                }]
                        };
                        self.security.encryptObject(param)
                            .then(
                                (res2) => {
                                    let loading = this.loadingCtrl.create();
                                    loading.present();
                                    self.compusPay(res2)
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
        let url = interfaceUrl.GasGenOrderAndPay;
        return new Promise<any>((resolve, reject) => {
            this.gasCardRequest.postMethod(url, param)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    if (err.retMsg) reject(err.retMsg);
                    else reject(err);
                })
        });
    }

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

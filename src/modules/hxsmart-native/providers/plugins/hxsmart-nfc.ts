import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
declare let nfc: any;
@Injectable()

export class HxsmartNFC {
    private platform: any;
    private http: any;
    private cardNo: string;//ETC卡号
    private backQueryAmount: string;//圈提金额（通过回退金额查询接口返回）
    private centerTransaction: string;//中心流水号
    private ICCardInfo: string;//Ic卡信息(圈存写卡需要)
    private chargeBackObj: any = {
        ETCCardInfo: "",//ETCCardInfo信息（指令获取ETC卡信息前40位）
        accountNo: "",//电子账户号（9~27位，长度19）
        amount: "",//充值金额，单位分，整数
        terminalID: "91110740",//终端编号（8位）
        balance: "",//ETC卡余额
        terminalTransaction: "123456"//终端流水号
    };

    private chargeApplyObj: any = {
        ETCCardInfo: "",//ETCCardInfo信息（指令获取ETC卡信息前40位）
        offlineTransNo: "",//脱机交易号（圈提返回的9-16位）
        initLoadInfo: "",//圈存初始化信息（圈存初始化返回的前30位）
        track2Info: "",//二磁道信息
        operator: "0481",//业务员编号
        terminalTransaction: "123456"//终端流水号
    };

    private chargeConfirmObj: any = {
        TAC: "",
        initLoadInfo: ""
    };

    constructor(platform: Platform, http: Http) {
        this.platform = platform;
        this.http = http;
    };

    /*
     * 返回指定字符串
     * start,end表示字符串开始和结束的位置，
     * 如果为正数表示从左到右（正数），
     * 如果为负数则为从右到左（倒数）
     * */
    private returnStr(obj, start, end) {
        let str = obj.result;
        let l = str.length;
        if (start < 0) {
            start = l + start;
        }
        if (end <= 0) {
            end = l + end;
        }
        let stIndex = start;
        let endIndex = end;
        let newStr = str.slice(stIndex, endIndex);
        return newStr;
    };

    private returnStr1(str, start, end) {
        let l = str.length;
        if (start < 0) {
            start = l + start;
        }
        if (end <= 0) {
            end = l + end;
        }
        let stIndex = start;
        let endIndex = end;
        let newStr = str.slice(stIndex, endIndex);
        return newStr;
    };

    /*
     * 将十进制金额转化为8位16进制
     * */
    private tenTo16(num) {
        let str = num.toString(16);
        let l = str.length;
        let zero = "";
        for (let i = 0; i < 8 - l; i++) {
            zero += "0";
        }
        return zero + str;
    }

    chckPlatform(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
                console.warn("该方法只用于移动平台");
                reject('该方法只用于移动平台');
            } else {
                resolve();
            }
        });
    }

    /*
     * checkModule检测手机是否有NFC模块
     * checkState检测手机NFC模块状态
     * registerConnectedCallback卡片与手机连接的成功回调
     * registerDeactivatedCallback卡片与手机断开的回调（暂未实现）
     * sendAPDU发送apdu指令
     * openNFCSetting打开NFC设置
     * */
    checkModule(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.chckPlatform().then(() => {
                nfc.checkModule(function (obj) {
                    if (obj.result == 1) {
                        console.log("手机支持NFC");
                        resolve();
                    } else {
                        console.log("手机不支持NFC");
                        reject();
                    }
                });
            }, () => {
                reject();
            });

        });
        return promise;
    };

    checkState(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            nfc.checkState(function (obj) {
                if (obj.result == 1) {
                    console.log("手机NFC功能已开启");
                    resolve();
                } else {
                    console.log("手机NFC功能未开启");
                    reject();
                }
            });
        });
        return promise;
    };

    openNFCSetting(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            nfc.openNFCSetting(function (obj) {
                if (obj.result == 1) {
                    console.log("跳转到打开NFC界面");
                    resolve();
                } else {
                    console.log("跳转失败");
                    reject();
                }
            });
        });
        return promise;
    };

    registerConnectedCallback(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.chckPlatform().then(() => {
                nfc.registerConnectedCallback(function () {
                    console.log("手机与卡连接了");
                    resolve();
                });
            }, () => {
                reject();
            });
        });
        return promise;
    };

    registerDeactivatedCallback(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            nfc.registerDeactivatedCallback(function (obj) {
                if (obj.result == 1) {
                    console.log("手机支持NFC");
                    resolve(1);
                } else {
                    reject(0);
                }
            });
        });
        return promise;
    };

    //发送指令
    sendAPDU(Apdu: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            nfc.sendAPDU(Apdu, function (data) {
                // console.log("发指令成功");
                // console.log(data);
                resolve(data);
            }, function (err) {
                // console.log("发指令失败");
                // console.log(err);
                reject(err);
            });
        });
        return promise;
    };

    //发送指令并判断返回的后4位是否为9000
    sendAPDU9000(Apdu: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let returnStr = this.returnStr;
            nfc.sendAPDU(Apdu, function (data) {
                //console.log("发指令成功");
                //console.log(data);
                if (returnStr(data, -4, 0) == '9000') {
                    resolve(data);
                } else {
                    reject(data);
                }
            }, function (err) {
                //console.log("发指令失败");
                // console.log(err);
                reject(err);
            });
        });
        return promise;
    };

    private sendAPDUFun(str) {
        return this.sendAPDU9000(str);
    }

    /*
     * 选择 AID
     * */
    private selectAid() {
        let p = Promise.all([
            this.sendAPDUFun('00A40000023F00'),
            this.sendAPDUFun('00A40000021001'),
        ]);
        return p;
    }

    /*
     * 获取卡片余额
     * 805C000204
     * */
    private getCardMount() {
        return this.sendAPDU9000('805C000204');
    }

    /*
     * 验证密码
     * 0020000003XXXXXX
     * XXXXXX为6位数密码
     * */
    private checkPassword(str) {
        // return this.sendAPDU9000('0020000003'+str);
        console.log(str);
        return this.sendAPDU9000('0020000003186155');
    }

    /*
     * 圈存初始化
     * 805000020BXYZ
     * X	密钥编号(2位)
     * Y	充值金额(8位十六进制)
     * Z	终端编号(12位)
     * */
    private QCInit(str) {
        return this.sendAPDU9000('805000020B' + str);
    }

    /*
     * 圈提初始化
     * 805001020BXYZ
     * X	密钥编号(2位)
     * Y	圈提金额(8位十六进制)小于或等于卡片余额
     * Z	终端编号(12位)
     * */
    private QTInit(str) {
        return this.sendAPDU9000('805001020B' + str);
    }

    /*
     *圈存写卡
     * 805200000BXYZ
     * X	后台返回的圈存日期
     * Y	后台返回的圈存时间
     * Z	后台返回的Mac2
     * */
    private QCWrite(str) {
        return this.sendAPDU9000('805200000B' + str);
    }

    /*
     *读二磁道信息（里面包含电子账户账号）
     * 00A404000E315041592E5359532E4444463031
     * 00B2010C
     * 00A4040008A000000333010101
     * 80A80000238321600000000000000000000000000000000156000000000001561405306099999999
     * 00B2010C
     * 返回二磁道信息（9~45，长度37） 电子账户号（9~27位，长度19）
     * */
    private readTrackTwo() {
        let p = Promise.all([
            this.sendAPDUFun('00A404000E315041592E5359532E4444463031'),
            this.sendAPDUFun('00B2010C'),
            this.sendAPDUFun('00A4040008A000000333010101'),
            this.sendAPDUFun('80A80000238321600000000000000000000000000000000156000000000001561405306099999999'),
            this.sendAPDUFun('00B2010C'),
        ]);
        return p;
    }

    /*
     * 获取粤通卡信息
     * 00B095001C
     * */
    private getCardInfo() {
        return this.sendAPDU9000('00B095001C');
    }


    /*
     * 充值回退查询接口
     * */
    readCardPromise(): Promise<any> {
        let p = Promise.all([this.selectAid(), this.getCardMount(), this.getCardInfo(), this.readTrackTwo()]);
        return p;
    }

    readCard(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.readCardPromise().then((data) => {
                this.chargeBackObj.balance = this.returnStr(data[1], 0, -4);
                console.log(this.chargeBackObj.balance);
                this.chargeBackObj.ETCCardInfo = this.returnStr(data[2], 0, -4);
                this.chargeApplyObj.ETCCardInfo = this.returnStr(data[2], 0, -4);
                this.cardNo = this.returnStr(data[2], 20, 24);
                this.chargeBackObj.accountNo = this.returnStr(data[3][4], 8, 27);
                this.chargeApplyObj.track2Info = this.returnStr(data[3][4], 8, 45);
                resolve(this.cardNo);
            }, (err) => {
                reject(err);
            });
        });
        return promise;
    }

    writeCard(chargeNUM: number): Promise<any> {
        console.log("开始写卡，写卡金额：" + chargeNUM);
        this.chargeBackObj.amount = chargeNUM;
        return new Promise((resolve, reject) => {
            this.selectAid().then(
                () => {
                    this.writeCardBQ(chargeNUM).then(
                        () => {
                            this.writeCardAP(chargeNUM).then(
                                () => {
                                    this.writeCardCf().then(
                                        (data) => {
                                            resolve(data);
                                        },
                                        (err) => {
                                            reject(err);
                                        }
                                    );
                                },
                                (err) => {
                                    reject(err);
                                }
                            );
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                },
                (err) => {
                    reject(err);
                }
            );
        });
    };

    /*
     * 写卡充值回退查询流程
     * */
    writeCardBQ(chargeNUM): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chargeBackFun().then(//充值回退查询
                (data) => {
                    if (data.retCode == '0000') {
                        console.log('充值回退查询返回0000，回退金额：' + data.context.backQueryAmount);
                        this.backQueryAmount = data.context.backQueryAmount;
                        this.checkPassword(data.context.pin).then(//验证密码
                            () => {
                                console.log('验证密码成功');
                                this.QTInit('01' + this.tenTo16(this.backQueryAmount) + '000091110740').then(//圈提初始化
                                    (data) => {
                                        console.log('圈提初始化成功');
                                        this.chargeApplyObj.offlineTransNo = this.returnStr(data, 8, 16);
                                        this.QCInit('01' + this.tenTo16(chargeNUM) + '000091110740').then(//圈存初始化
                                            (data) => {
                                                console.log('圈存初始化成功');
                                                this.chargeApplyObj.initLoadInfo = this.returnStr(data, 0, 30);
                                                this.chargeConfirmObj.initLoadInfo = this.returnStr(data, 0, 30);
                                                resolve();
                                            },
                                            () => {
                                                console.log('圈存初始化失败');
                                                reject('写卡失败');
                                            }
                                        )
                                    },
                                    () => {
                                        console.log('验证密码失败');
                                        reject('写卡失败，请联系客服');
                                    }
                                );
                            },
                            () => {
                                this.getCardInfo().then(//验证密码失败重新获取卡号
                                    (data) => {
                                        console.log('验证密码失败重新获取卡号成功');
                                        if (this.cardNo != this.returnStr(data[2], 20, 24)) {
                                            reject('充值失败，请联系客服');
                                        } else {
                                            reject('请放入正确的ETC卡');
                                        }
                                    },
                                    (err) => {
                                        console.log('验证密码失败重新获取卡号失败');
                                        reject(err);
                                    }
                                );
                            }
                        );
                    } else {
                        console.log("充值回退接口错误信息：");
                        console.log(data);
                        reject(data.retMsg);
                    }
                },
                (err) => {
                    console.log("充值回退接口错误信息：");
                    console.log(err);
                    reject('写卡失败，请联系客服');
                }
            );
        });
    };

    /*
     * 写卡充值申请流程
     * */
    writeCardAP(chargeNUM): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chargeApplyFun().then(
                (data) => {
                    if (data.retCode == '0000') {
                        console.log('写卡申请，充值申请接口成功');
                        this.centerTransaction = data.context.centerTransaction;
                        this.ICCardInfo = data.context.ICCardInfo;
                        this.QCWrite(this.returnStr1(this.ICCardInfo, 85, 93) + this.returnStr1(this.ICCardInfo, 93, 99) + this.returnStr1(this.ICCardInfo, 99, 107)).then(//圈存写卡
                            (data) => {
                                console.log('写卡申请，圈存写卡成功');
                                this.chargeConfirmObj.TAC = this.returnStr(data, 0, 8);
                                this.QCInit('01' + this.tenTo16(chargeNUM) + '000091110740').then(//圈存初始化
                                    () => {
                                        console.log('写卡申请，圈存初始化成功');
                                        resolve();
                                    },
                                    (err) => {
                                        console.log('写卡申请，圈存初始化失败');
                                        reject(err);
                                    }
                                )
                            },
                            (err) => {
                                console.log('写卡申请，圈存写卡失败');
                                reject(err);
                            }
                        );
                    } else {
                        console.log("充值申请接口错误信息：");
                        console.log(data);
                        reject(data.retMsg);
                    }
                },
                (err) => {
                    console.log("充值申请接口错误信息：");
                    console.log(err);
                    reject('写卡失败，请联系客服');
                }
            );
        });
    };

    /*
     * 写卡充值确认流程
     * */
    writeCardCf(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chargeConfirmFun().then(
                (data) => {
                    if (data.retCode == '0000') {
                        console.log('写卡确认成功');
                        console.log(data);
                        resolve(data);
                    } else {
                        console.log('写卡确认失败');
                        console.log(data);
                        reject(data);
                    }
                },
                (err) => {
                    console.log('写卡确认失败');
                    console.log(err);
                    reject(err);
                }
            );
        });
    };

    /*
     * 调用充值回退查询接口
     * */
    chargeBackFun(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postData('http://192.168.160.176:8084/YueTongKa/libreOffice/rechargeCallBack', this.chargeBackObj)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    /*
     * 调用充值申请接口
     * */
    chargeApplyFun(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postData('http://192.168.160.176:8084/YueTongKa/libreOffice/rechargeApply', this.chargeApplyObj)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    /*
     * 调用充值确认接口
     * */
    chargeConfirmFun(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postData('http://192.168.160.176:8084/YueTongKa/libreOffice/rechargeConfirm', this.chargeConfirmObj)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    /**
     * 请求方法
     * @param url
     * @param data
     * @returns {Promise<any>}
     */
    private postData(url: string, data?: any): Promise<any> {
        data = data || {};
        let headers = new Headers({'Content-Type': 'application/json'});
        console.log("请求地址:", url, "参数:", data);
        let promise = new Promise((resolve, reject) => {
            this.http
                .post(url, JSON.stringify(data), {headers: headers})
                .toPromise()
                .then((data) => {
                    console.log(data);
                    resolve(JSON.parse(data._body));
                })
                .catch((err) => {
                    console.log(err, "xxxxxx");
                    reject(err)
                });
        });
        return promise;
    }
}

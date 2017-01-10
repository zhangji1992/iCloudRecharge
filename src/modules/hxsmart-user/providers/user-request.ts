import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {UserInterface} from "./user-interface";
import {HxsmartSecurity} from "../../hxsmart-native/providers/plugins/hxsmart-security";

@Injectable()
export class UserRequest {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: Http,
                public security: HxsmartSecurity) {
    }

    //发送手机验证码
    sendMobileCode(param): any {
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.sendMobileCode, param).then((res) => {
                resolve("验证码发送成功!");
            }, (err) => {
                if (err.retCode == "inputDataError") {
                    reject(err.retMsg);
                } else if (err.retCode == "Already registered") {
                    reject(err.retMsg);
                } else if (err.retCode == "invalid loginAccount") {
                    reject(err.retMsg);
                } else if (err.retCode == "OneDaySeparated") {
                    reject(err.retMsg);
                } else {
                    reject(err.retMsg);
                }


            });
        });
    }

    //验证手机验证码
    mobileConfirm(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.mobileConfirm, param).then((res) => {
                resolve("手机验证码正确");
            }, (err) => {
                if (err.retCode == "inputDataError") {
                    reject(err.retMsg);
                } else {
                    reject(err.retMsg);
                }
            });
        });
    }

    //发送邮箱验证码
    sendEmailCode(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.sendEmailCode, param).then((res) => {
                resolve("验证码发送成功");
            }, (err) => {
                if (err.retCode == "inputDataError") {
                    reject(err.retMsg);
                } else if (err.retCode == "invalid Email") {
                    reject(err.retMsg);
                } else if (err.retCode == "AlreadyBind") {
                    reject(err.retMsg);
                } else {
                    reject(err.retMsg);
                }

            });
        });
    }

    //验证邮箱验证码
    emailConfirm(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.emailConfirm, param).then((res) => {
                resolve(res);
            }, (err) => {
                if (err.retCode == "inputDataError") {
                    reject(err.retMsg);
                } else if (err.retCode == "invalid Email") {
                    reject(err.retMsg);
                } else {
                    reject("未知错误");
                }
            });
        });
    }

    //注册
    register(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.security.encryptObject(param)
                .then(response => {
                    console.log("注册加密成功", response);
                    this.postData(UserInterface.register, response)
                        .then((res) => {
                            this.security.setWorkKey(UserInterface.getSuitDynamicKey)
                                .then(() => {
                                    console.log('密钥设置成功');
                                }, (err) => {
                                    console.log('密钥设置失败', err);
                                });
                            resolve(res);
                        }, (err) => {
                            if (err.retCode == "Already registered") {
                                reject(err.retMsg);
                            } else if (err.retCode == "1000") {
                                reject()
                            }
                        });
                }, err => console.log("注册加密失败:", err));

        });
    }

    /**
     * 登录
     * @param param {string,string}
     * @returns {Promise<any>}
     */
    login(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.security.encryptObject(param)
                .then(response => {
                    console.log("登录加密成功:", response);
                    this.postData(UserInterface.login, response).then((res) => {
                        resolve(this.loginData(res));
                    }, (err) => {
                        if (err.retCode == "errorUserOrPwd") {
                            reject(err.retMsg);
                        } else if (err.retCode == "Already registered") {
                            reject("您输入手机号未被注册,请先注册");
                        }
                        else {
                            reject(err.retMsg);
                        }
                    });
                });
        });
    }

    /**
     * 格式化登录数据
     * {
     *     id: "",      //用户id
     *     mobile: "",  //手机号
     *     email: "",   //绑定邮箱
     * }
     **/
    loginData(res: any): any {
        console.info("登录信息:", res);
        let data = {
            id: res.context.partyId,
            mobile: res.context.contact[0].cellPhone,
            email: res.context.contact[0].email,
            isSetPayPwd: res.context.isSetPayPwd
        };
        return data;
    }

    /**
     *
     * @param param {}
     * @returns {Promise<T>}
     */
    loginOut(param?: any): Promise<any> {
        let data = param || {};
        return new Promise((resolve, reject) => {
            this.security.encryptObject(data)
                .then(response => {
                    console.log("登出加密:", response);
                    this.postData(UserInterface.logout, response).then((res) => {
                        this.security.setWorkKey(UserInterface.getSuitDynamicKey)
                            .then(() => {
                                console.log('密钥设置成功');
                            }, (err) => {
                                console.log('密钥设置失败', err);
                            });
                        resolve(res);
                    }, (error) => {
                        this.security.setWorkKey(UserInterface.getSuitDynamicKey)
                            .then(() => {
                                console.log('密钥设置成功');
                            }, (err) => {
                                console.log('密钥设置失败', err);
                            });
                        reject("用户登录信息无效,请重新登录");
                    });
                });
        });
    }

    //重置登录密码
    resetPwd(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.security.setWorkKey(UserInterface.getSuitDynamicKey)
                .then(() => {
                    this.security.encryptObject(param)
                        .then(response => {
                            console.log("重置密码加密成功", response);
                            this.postData(UserInterface.resetPwd, response).then(
                                res => {
                                    resolve(res);
                                }, err => {
                                    reject(err)
                                });
                        }, error => console.log("重置登录密码加密失败:", error));
                    console.log('密钥设置成功');
                }, (err) => {
                    console.log('密钥设置失败', err);
                });

        });
    }

    //修改登录密码
    /**
     *
     * @param param {object} {NewPassword:"新密码",OldPassword:"旧密码"}
     * @returns {Promise<T>} {string}
     */
    modifyPwd(param): Promise<any> {
        console.log("修改登录密码request:", param)
        return new Promise((resolve, reject) => {
            this.security.encryptObject(param)
                .then(response => {
                    console.log("修改登录密码加密成功:", response);
                    this.postData(UserInterface.modifyPwd, response).then((res) => {
                        console.log(res);
                        resolve("登录密码修改成功!");
                    }, (err) => {
                        console.log(err);
                        if (err.retCode == "PassDisaccord") {
                            reject("旧密码不正确,请重新输入!")
                        } else {
                            reject("未知错误,请重试");
                        }
                    });
                }, error => console.log("修改密码加密失败", error));

        });
    }


    //设置支付密码
    setPayPwd(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.security.encryptObject(param)
                .then(response => {
                    console.log("设置支付密码加密成功:", response);
                    this.postData(UserInterface.setPayPwd, response).then((res) => {
                        resolve("支付密码设置成功!");
                    }, (err) => {
                        reject(err)
                    });
                }, error => console.log("设置支付密码加密失败:", error));

        });
    }

    //重置支付密码
    resetPayPwd(params): any {
        return new Promise((resolve, reject) => {
            this.security.encryptObject(params)
                .then(response => {
                    console.log("重置支付密码加密成功:", response);
                    this.postData(UserInterface.resetPayPwd, response)
                        .then((res) => {
                            resolve(res);
                        }, (err) => {
                            reject(err)
                        });
                }, error => console.log("重置支付密码加密失败:", error));
        });
    }

    //绑定邮箱
    bindEmail(param): Promise<any> {
        console.log(param);
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.bindEmail, param).then((res) => {
                resolve(this.loginData(res));
            }, (err) => {
                console.log(err);
                if (err.retCode == "inputDataError") {
                    reject(err.retMsg);
                } else if (err.retCode == "AlreadyBind") {
                    reject(err.retMsg);
                } else {
                    reject(err);
                }
            });
        });
    }

    //修改绑定手机
    modifyMobile(param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.postDataOther(UserInterface.modifyMobile, param).then((res) => {
                resolve(this.loginData(res));
            }, (err) => {
                if (err.retMsg == "inputDataError") {
                    reject(err.retMsg);
                } else if (err.retMsg == "AlreadyBind") {
                    reject(err.retMsg)
                } else {
                    reject(err.retMsg);
                }
            });
        });
    }


    /**
     * 统一请求方法
     * @param url ｛string｝ 请求地址
     * @param data {object} 请求参数
     * @returns {Promise<TResult>}
     * @private
     */
    private postData(url: string, data?: any): Promise<any> {
        data = data || {};
        console.log("请求地址:", url, "参数:", data);
        let promise = new Promise<any>((resolve, reject) => {
            this.http
                .post(url, data, {headers: this.headers})
                .toPromise()
                .then(res => {
                    console.log("请求结果:", res);
                    let result = res.json();
                    result.retCode == "0000" ? resolve(result) : reject(result);
                })
                .catch((err) => reject(err));
        });
        return promise;
    }

    private postDataOther(url: string, data?: any): Promise<any> {
        data = data || {};
        console.log("请求地址:", url, "参数:", data, JSON.stringify(data));
        let promise = new Promise<any>((resolve, reject) => {
            this.http
                .post(url, JSON.stringify(data), {headers: this.headers})
                .toPromise()
                .then(res => {
                    console.log(res);
                    let result = res.json();
                    result.retCode == "0000" ? resolve(result) : reject(result);
                })
                .catch((err) => reject(err));
        });
        return promise;
    }

    loginTest(param): Promise<any> {
        console.log(param);
        return new Promise((resolve, reject) => {
            let url = "http://hxsmart.3322.org:25080" + "/iCloudRecharge/Utile/login";
            this.postData(url, param)
                .then(
                    res => {
                        resolve(this.loginData(res))
                    },
                    err => {
                        if (err == "errorUserOrPwd") {
                            reject(err.retMsg);
                        } else {
                            reject(err.retMsg);
                        }
                    }
                );
        });
    }

}


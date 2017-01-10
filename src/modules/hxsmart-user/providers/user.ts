import {Injectable} from '@angular/core';
import {Http,} from '@angular/http';
import {UserRequest} from "./user-request";
import {HxsmartSecurity} from "../../hxsmart-native/providers/plugins/hxsmart-security";
import {Todo} from "../../hxsmart-todo/providers/todo";
import {LoadingService} from "./loading-service";

@Injectable()
export class User {
    /**
     * 用户登录信息
     */
    private userPhone: any;                 //用户手机号
    private userEmail: any;                  //用户绑定邮箱
    private userStatus: boolean = false;    //用户登录状态
    private userId: number;                 //用户id
    private userTodo: any;                  //代办事项
    private userPwd: any = "******";
    private userIsSetPayPwd: boolean = false;

    constructor(public userRequest: UserRequest,
                public http: Http,
                public security: HxsmartSecurity,
                public todoService: Todo,
                public loading: LoadingService) {
    }

    /**
     * 获取用户信息
     * @returns {{id: "用户id, status: "获取用户登录状态,true为登录,false为未登录", phone: "用户登录手机好", email: "用户绑定邮箱"}}
     */
    getUserInfo(): any {
        let userInfo = {
            id: this.userId,
            status: this.userStatus,
            phone: this.userPhone,
            email: this.userEmail,
            getTodo: this.userTodo,
            pwdContent: this.userPwd,
            isSetPayPwd: this.userIsSetPayPwd   //是否设置支付密码: true:已设置,false:未设置
        };
        return userInfo;
    }

    /**
     * 发送手机验证码
     * @param params {object} {phone:"手机号",verifyCodePro:"验证类型",AccountNo:"帐号"} VerifyCodePro = CheckHoldBank,CheckHoldEAccount,AccountNo时必输
     * @returns {Promise<any>}
     */
    sendMobileCode(params): Promise<any> {
        let loading1 = this.loading.basicLoading('发送中...');
        return new Promise((resolve, reject) => {
            this.userRequest
                .sendMobileCode({
                    MobliePhone: params.phone,
                    VerifyCodePro: params.verifyCodePro,
                    AccountNo: params.accountNo
                }).then(
                (res) => {
                    loading1.dismiss().then(() => {
                    }).catch((err) => {
                        console.log(err, "1245442354234")
                    });
                    resolve(res);
                },
                (err) => {
                    loading1.dismiss().then(() => {
                    }).catch((err) => {
                        console.log(err, "1245442354234")
                    });
                    reject(err);
                }
            ).catch((err) => {
                console.log(err);
                reject(err);
            })
        });
    }

    /**
     * 验证手机验证码
     * @param params {object} {phone:"手机号",verifyCodePro:"验证类型",verifyCode:"验证码"}
     * VerifyCodePro= CheckHoldBank,CheckHoldEAccount时,AccountNo必输
     * @returns {Promise<any>}
     */
    mobileConfirm(params): Promise<any> {
        let l = this.loading.basicLoading('验证中...');
        return new Promise((resolve, reject) => {
            this.userRequest
                .mobileConfirm({
                    MobliePhone: params.phone,
                    VerifyCodePro: params.verifyCodePro,
                    VerifyCode: params.verifyCode,
                    AccountNo: params.accountNo
                }).then(
                (res) => {
                    l.dismiss();
                    resolve(res);
                },
                (err) => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    /**
     * 发送邮箱验证码
     * @param params {object} {email:"邮箱",verifyCodePro:"验证类型"}
     * @returns {Promise<any>}
     */
    sendEmailCode(params): Promise<any> {
        let l = this.loading.basicLoading("发送中...");
        return new Promise((resolve, reject) => {
            this.userRequest
                .sendEmailCode({
                    EmailAddress: params.email,
                    VerifyCodePro: params.verifyCodePro
                }).then(
                (res) => {
                    l.dismiss();
                    resolve(res)
                },
                (err) => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    /**
     * 验证邮箱验证码
     * @param params {object} {email:"邮箱",verifyCodePro:"验证类型",verifyCod:"验证码"}
     * @returns {Promise<any>}
     */
    emailConfirm(params): Promise<any> {
        let l = this.loading.basicLoading('验证中...');
        return new Promise((resolve, reject) => {
            this.userRequest
                .emailConfirm({
                    EmailAddress: params.email,
                    VerifyCodePro: params.verifyCodePro,
                    EmailVerifyCode: params.verifyCode
                }).then(
                (res) => {
                    l.dismiss();
                    resolve(res);
                },
                (err) => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    /**
     * 用户注册
     * @param params {object} {phone:"手机号",verifyCode:"验证码",pwd:"密码"}
     * @returns {Promise<any>}
     */
    register(params): Promise<any> {
        let l = this.loading.basicLoading("注册中...");
        return new Promise((resolve, reject) => {
            this.userRequest.register({
                MobilePhone: params.phone,
                MobileVerifyCode: params.verifyCode,
                Password: params.pwd
            }).then(
                res => {
                    l.dismiss();
                    resolve(res);
                },
                err => {
                    l.dismiss();
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    /**
     * 登录
     * @param param {object} {phone:"",pwd:""}
     * @returns {Promise<any>}
     */
    public login(params): Promise<any> {
        let l = this.loading.basicLoading("登录中...");
        return new Promise((resolve, reject) => {
            this.userRequest.login({
                MobilePhone: params.phone,
                Password: params.pwd
            }).then(
                res => {
                    l.dismiss();
                    console.log("处理后的数据:", res);
                    this.userEmail = res.email;
                    this.userPhone = res.mobile;
                    this.userId = res.id;
                    this.userStatus = true;
                    if (res.isSetPayPwd) {
                        console.log(res.isSetPayPwd);
                        this.userIsSetPayPwd = true;
                    } else {
                        this.userIsSetPayPwd = false;
                    }
                    this.todoService.getTodoNum().then(
                        suc => {
                            console.log("成功获取待办事项", suc);
                        },
                        err => console.log("获取待办事项失败")
                    );
                    resolve(res)
                },
                err => {
                    l.dismiss();
                    reject(err);
                }
            )
        });
    }

    //登出
    loginOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRequest.loginOut()
                .then(
                    (res) => {
                        this.userStatus = false;
                        this.userEmail = '';
                        this.userPhone = '';
                        this.userId = null;
                        resolve(res);
                    }, (err) => {
                        this.userStatus = false;
                        this.userEmail = '';
                        this.userPhone = '';
                        this.userId = null;
                        reject(err);
                    }
                );
        });
    }

    /**
     * 重置登录密码
     * @param params {object} {verifyWay:"手机号码，或者电子邮件地址",getWayBack:"Email或MobilePhone",verifyCode:"验证码",pwd:"登录密码"}
     * @returns {Promise<T>}
     */
    resetPwd(params): Promise<any> {
        let l = this.loading.basicLoading("重置中...");
        return new Promise((resolve, reject) => {
            this.userRequest.resetPwd({
                VerifyWayAccount: params.verifyWay,
                GetBackWay: params.getWayBack,
                VerifyCode: params.verifyCode,
                Password: params.pwd
            }).then(res => {
                l.dismiss();
                resolve(res);
            }, err => {
                l.dismiss();
                reject(err);
            });
        });
    }

    /**
     * 修改登录密码
     * @param params {object} {newPwd:"",oldPwd:""}
     * @returns {Promise<any>} {string} 成功时,返回"密码修改成功!",旧密码不正确的时候,返回"旧密码不正确,请重新输入!",其他则返回"未知错误,请重试"
     */
    modifyPwd(params): Promise<any> {
        let l = this.loading.basicLoading("修改中...");
        return new Promise((resolve, reject) => {
            this.userRequest.modifyPwd({
                NewPassword: params.newPwd,
                OldPassword: params.oldPwd
            }).then(
                res => {
                    l.dismiss();
                    resolve(res)
                },
                err => {
                    l.dismiss();
                    reject(err)
                }
            );
        });

    }


    //获取密码键盘
    getInputPwd() {
        return new Promise((resolve, reject) => {
            this.security.inputPwd({type: 2}).then((res) => {
                console.log('成功', res);
                resolve(res);
            }, (err) => {
                console.log('界面失败', err);
                reject(err);
            });
        });
    }

    //设置支付密码
    setPayPwd(params): Promise<any> {
        let l = this.loading.basicLoading("设置中...");
        return new Promise((resolve, reject) => {
            this.userRequest.setPayPwd({
                ModuleAppCode: "",
                PayChannelCode: "",
                PayPassword: params.payPwd
            }).then(
                res => {
                    l.dismiss();
                    this.userIsSetPayPwd = true;
                    resolve(res);
                },
                err => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    //重置支付密码
    resetPayPwd(params): Promise<any> {
        console.log("重置支付密码：", params);
        let l = this.loading.basicLoading("重置中...");
        return new Promise((resolve, reject) => {
            this.userRequest.resetPayPwd({
                PayPassword: params.payPwd,
                VerifyCode: params.verifyCode,
                GetBackWay: params.getBackWay,
                ModuleAppCode: "",
                PayChannelCode: "",
            }).then(
                res => {
                    l.dismiss();
                    resolve(res);
                },
                err => {
                    l.dismiss();
                    reject(err);
                }
            );
        });

    }

    /**
     * 绑定邮箱或修改绑定邮箱
     * @param params {object} {verifyCode:"验证码",email:"邮箱"}
     * @returns {Promise<T>}
     */
    bindEmail(params): Promise<any> {
        let l = this.loading.basicLoading("加载中...");
        return new Promise((resolve, reject) => {
            this.userRequest
                .bindEmail({
                    EmailVerifyCode: params.verifyCode,
                    VerifyCodePro: "BindEmail",
                    EmailAddress: params.email
                }).then(
                (res) => {
                    l.dismiss();
                    this.userEmail = res.email;
                    resolve(res);
                }, (err) => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    /**
     * 修改绑定手机
     * @param params {object} {verifyCode:"验证码",phone:"手机号"}
     * @returns {Promise<T>}
     */
    modifyMobile(params): Promise<any> {
        let l = this.loading.basicLoading("修改中...");
        return new Promise((resolve, reject) => {
            this.userRequest
                .modifyMobile({
                    EmailVerifyCode: params.verifyCode,
                    VerifyCodePro: "ResetMobilePhone",
                    MobilePhone: params.phone
                }).then(
                (res) => {
                    l.dismiss();
                    this.userPhone = res.mobile;
                    resolve(res);
                }, (err) => {
                    l.dismiss();
                    reject(err);
                }
            );
        });
    }

    loginTest(params): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userRequest.loginTest({
                MobilePhone: params.phone,
                Password: params.pwd
            }).then(
                (res) => {
                    console.log(res);
                    this.userEmail = res.email;
                    this.userPhone = res.mobile;
                    this.userId = res.id;
                    this.userStatus = true;
                    if (res.isSetPayPwd) {
                        console.log(res.isSetPayPwd);
                        this.userIsSetPayPwd = true;
                    } else {
                        this.userIsSetPayPwd = false;
                    }
                    this.todoService.getTodoNum().then(
                        suc => {
                        },
                        err => console.log("获取待办事项失败")
                    ),
                        resolve(res)
                }, (err) => reject(err)
            );
        });
    }

}

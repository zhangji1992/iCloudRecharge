import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
declare let Security: any;

/**
 * 使用加密插件必须先调用设置密钥方法setWorkKey(),具体如下
 */
@Injectable()
export class HxsmartSecurity {
    private platform: any;
    private http: any;

    constructor(platform: Platform, http: Http) {
        this.platform = platform;
        this.http = http;
    }


    //"http://192.168.169.214:25080/iCloudRecharge/Util/GetSuitDynamicKey"
    /**
     * 设置插件的工作密钥
     * @param address {string} 获取工作密钥接口地址
     * @returns {Promise}
     */
    public setWorkKey(address: string): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn("该方法只用于移动平台");
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        return new Promise((resolve, reject) => {
            this.postData(address)
                .then((res1) => {
                    console.log("获取密钥成功1", res1);
                    Security.setKey(
                        (res2) => {
                            console.log(res2, '设置密钥成功3');
                            res2.result == 1 ? resolve() : reject();
                        },
                        (err) => {
                            console.log(err, '设置密钥失败4');
                            reject(err)
                        }, {key: res1})
                }, (err) => {
                    console.log("获取密钥失败2", err);
                    reject(err)
                })
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
                .then(res => {
                    console.log(res._body, '获取密钥成功1');
                    resolve(res._body + "");
                })
                .catch((err) => {
                    console.log(err, "xxxxxx");
                    reject(err)
                });
        });
        return promise;
    }

    /**
     * 输入秘密，并且返回加密后的密码
     * @param param {object} {type:} type的值为1或者2，1表示不固定长度的密码；2表示固定六位长度的密码
     * @returns {Promise} {result:""}加密后的密码
     */
    public inputPwd(param: any): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn("该方法只用于移动平台");
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        return new Promise((resolve, reject) => {
            Security.getPin(
                (res) => {
                    console.log(res, '输入秘密成功');
                    resolve(res.result);
                },
                (err) => {
                    console.log(err, '输入秘密失败');
                    if (err.result == 7) reject('未设置密钥');
                    else if (err.result == 9) reject('取消操作');
                    else reject(err);
                }, param)
        });
    }

    /**
     * 加密json对象
     * @param param ｛object｝ {name:"小李"，age:20}
     * @returns {Promise} {result:""}
     */
    public encryptObject(param: any): Promise<any> {
        console.log(param);
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn("该方法只用于移动平台");
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        return new Promise((resolve, reject) => {
            Security.encryptMsg(
                (res) => {
                    console.log(res, '加密成功');
                    resolve(res.result);
                },
                (err) => {
                    console.log(err, '加密失败');
                    if (err.result == 7) reject('未设置密钥');
                    else if (err.result == 9) reject('取消操作');
                    else if (err.result == 3) reject('加密参数有误');
                    else if (err.result == 4) reject('加密参数为空');
                    else reject(err);
                }, param)
        });
    }

    /**
     * 解密
     * @param param {object} {message:""}
     * @returns {Promise} {object}
     */
    public decryptMsg(param: any): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn("该方法只用于移动平台");
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        return new Promise((resolve, reject) => {
            Security.decryptMsg(
                (res) => {
                    console.log(res, '解密成功');
                    resolve(res);
                },
                (err) => {
                    console.log(err, '解密失败');
                    if (err.result == 7) reject('未设置密钥');
                    else if (err.result == 9) reject('取消操作');
                    else if (err.result == 6) reject('解密失败');
                    else if (err.result == 4) reject('解密参数为空');
                    else reject(err);
                }, param)
        });
    }

}

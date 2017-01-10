import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

declare let hxMap: any;

@Injectable()
export class HxsmartMap {
    public platform: any;
    private errMap: any = {
        "2": "JSON格式错误",
        "3": "参数为空",
        "4": "没有权限",
        "5": "用户取消操作",
        "9": ""
    };//错误码

    constructor(platform: Platform) {
        this.platform = platform;
    }

    /**
     * 初始化地图显示数据
     * @param url ｛string｝ 获取数据接口地址
     * @returns {any}
     */
    public init(url: string): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn('该方法只用于移动平台');
            return Promise.reject('该方法只用于移动平台');
        }
        return new Promise((resolve, reject) => {
            hxMap.init(
                (res) => {
                    res.result == 1 ? resolve() : reject("初始化地图数据失败，请重试！");
                },
                (err) => {
                    reject(this.errMap[err.result + ""]);
                },
                {serverUrl: url})
        });
    }

    /**
     * 打开地图
     * @param stationType {Array} 站点类型
     * @returns {any}
     */
    public openMap(stationType?: Array<string>): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn('该方法只用于移动平台');
            return Promise.reject('该方法只用于移动平台');
        }
        return new Promise((resolve, reject) => {
            hxMap.startMap(
                (res) => {
                    res.result == 1 ? resolve() : reject("初始化地图数据失败，请重试！");
                },
                (err) => {
                    reject(this.errMap[err.result + ""]);
                },
                {stationType: ["充值终端", "燃气网点", "银行充值点", "写卡终端"]})
        });

    }


}

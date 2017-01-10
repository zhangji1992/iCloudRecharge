import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
declare var plugins: any;

@Injectable()
export class HxsmartSharing {
    public platform: any;

    constructor(platform: Platform) {
        this.platform = platform;
    }

    /**
     * 分享
     * @param param {object} {message: '',url: 'https://www.website.com/foo/#bar?a=b'}
     * @returns {Promise}
     * @description 参数都是选填
     */
    public sharing(param: any): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn("该方法只用于移动平台");
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        return new Promise((resolve, reject) => {
            plugins.socialsharing.share(param.message, null, null, param.url,
                (res) => {
                    res.completed ? resolve() : reject("分享失败，请重试！");
                },
                (err) => {
                    console.log(err, '分享失败');
                    reject('分享失败，请重试！');
                },
                param);
        })
    }

}

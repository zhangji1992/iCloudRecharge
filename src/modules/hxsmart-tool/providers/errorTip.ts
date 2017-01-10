/**
 * Created by Admin1 on 2016/12/9.
 */
import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class ErrorTip {
    constructor(private toastCtrl: ToastController) {
    }

    /**
     * 错误提示方法
     * @param map {Object} {"1000":"提示信息"} 错误字典 必填
     * @param key {string} 错误码 必填
     * @param position ｛string｝ 吐丝的位置"top", "middle", "bottom" ，bottom为默认值 选填
     * @returns {Promise<void>}
     */
    public toast(map: any, key: string, position?: string): Promise<any> {
        let toast = this.toastCtrl.create({
            message: map[key],
            duration: 2000,
            position: position
        });
        toast.present();
        return Promise.resolve();
    }
}

import {Injectable} from "@angular/core";
import {AlertController} from "ionic-angular";

@Injectable()
export class AlertService {
    constructor(public alertCtrl: AlertController) {
    }

    presentAlert(params): void {
        let alert = this.alertCtrl.create({
            title: "提示",
            message: params.msg,
            buttons: ["确定"]
        });
        alert.present();
    }

    /**
     * 弹出Alert提示框
     * @param params {object} {altTitle:"标题",altMsg:"提示信息",altBtn:"[功能按钮]"}
     */
    presentBasicAlert(params): void {
        let alert = this.alertCtrl.create({
            title: params.altTitle,
            message: params.altMsg,
            buttons: params.altBtns,
        });
        alert.present();
    }
}

import {Component, Input} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {CGB2accountRechargeDetail} from '../CGB-2account-recharge-detail/CGB-2account-recharge-detail';
@Component({
    selector: 'CGB-2account-recharge',
    templateUrl: 'CGB-2account-recharge.html'
})
export class CGB2accountRecharge {
    private myValue: any;//提现金额
    @Input() info: any;

    constructor(private navCtrl: NavController, public toastCtrl: ToastController) {
    }

    ngOnInit() {
        console.log(this.info);
    }

    goRechangeDetail() {
        this.myValue = this.myValue + '';
        console.log(this.myValue);
        let b;
        if (this.myValue.indexOf('.') == -1) {
            b = 0;
        } else {
            b = this.myValue.slice(this.myValue.indexOf('.') + 1);
        }
        if (this.myValue == '0' || this.myValue == 'null' || JSON.parse(this.myValue) <= 0 || b.length > 2) {
            let toast = this.toastCtrl.create({
                message: '充值金额不合法',
                duration: 3000
            });
            toast.present();
            console.log('充值失败')
        } else {
            this.navCtrl.push(CGB2accountRechargeDetail, {account: this.info, value: this.myValue});
        }

    }
}

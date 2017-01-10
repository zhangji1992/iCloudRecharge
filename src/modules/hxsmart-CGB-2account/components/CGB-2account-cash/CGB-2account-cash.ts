import {Component, Input} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {CGB2accountCashDetail} from '../CGB-2account-cash-detail/CGB-2account-cash-detail';
@Component({
    selector: 'CGB-2account-cash',
    templateUrl: 'CGB-2account-cash.html'
})
export class CGB2accountCash {
    private myValue: any;
    @Input() info: any;

    constructor(private navCtrl: NavController,
                public toastCtrl: ToastController) {
    }

    ngOnInit() {
        console.log(this.info);
    }

    cashAll() {
        this.myValue = this.info.balance;
        console.log(this.info.balance)
    }

    goCashDetail() {
        this.myValue = this.myValue + '';
        console.log(this.myValue);
        console.log(this.myValue);
        let b;
        if (this.myValue.indexOf('.') == -1) {
            b = 0;
        } else {
            b = this.myValue.slice(this.myValue.indexOf('.') + 1);
        }
        if (this.myValue == '0' || this.myValue == 'null' || JSON.parse(this.myValue) > JSON.parse(this.info.balance) || JSON.parse(this.myValue) <= 0 || b.length > 2) {
            let toast = this.toastCtrl.create({
                message: '提现金额不合法',
                duration: 3000
            });
            toast.present();
            console.log('提现失败')
        } else {
            this.navCtrl.push(CGB2accountCashDetail, {account: this.info, value: this.myValue});
        }
    }
}

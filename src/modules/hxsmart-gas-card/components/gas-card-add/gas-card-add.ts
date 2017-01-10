import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {GasCard} from '../../providers/gas-card';
import {GasCardAdd1Component} from '../gas-card-add1/gas-card-add1';
import {GasSelectComponent} from '../gas-select/gas-select';

@Component({
    selector: 'gas-card-add',
    templateUrl: 'gas-card-add.html'
})
export class GasCardAdd {
    GasName: string;
    GasCardNo: string;

    constructor(public nav: NavController,
                public modalCtrl: ModalController,
                public gasCard: GasCard) {
    }

    selectCompus() {
        let self = this;
        let selectCompusModal = this.modalCtrl.create(GasSelectComponent);
        selectCompusModal.onDidDismiss(data => {
            if (data.supplierName) {
                console.log(data);
                self.gasCard.addGasCardPost.SupplierPartyId = data.partyId;
                self.GasName = data.supplierName;
            }
        });
        selectCompusModal.present();
    };

    goNext() {
        let reg = /^[0-9a-zA-Z]+$/
        let self = this;
        if (self.GasName == '' || self.GasName == undefined) {
            self.gasCard.showAlert('提示', '请选择燃气公司', ['确定']);
            return;
        }
        if (self.GasCardNo == '' || self.GasCardNo == undefined) {
            self.gasCard.showAlert('提示', '请输入燃气卡卡号', ['确定']);
            return;
        }
        if (!reg.test(self.GasCardNo)) {
            self.gasCard.showAlert('提示', '卡号只能为数字或字母', ['确定']);
            return;
        }
        self.gasCard.addGasCardPost.CardNo = self.GasCardNo;
        self.gasCard.addGasCardPost.gasCompany = self.GasName;
        //self.nav.push(GasCardAdd1Component);
        self.gasCard.cardIsBind(self.GasCardNo, function (data) {
            self.nav.push(GasCardAdd1Component);
        });
    }

    ionViewCanLeave() {

    }

}

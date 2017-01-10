import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GasCardCharge1Component} from '../gas-card-charge1/gas-card-charge1';
import {GasCard} from '../../providers/gas-card';


@Component({
    selector: 'gas-card-charge',
    templateUrl: 'gas-card-charge.html'
})
export class GasCardChargeComponent implements OnInit {
    maxGasNum: number;
    totalPrice: number;
    transParam = {
        carNo: "",
        gasNum: "",
        gasPrice: "",
        SupplierName: "",
        accountTypeName: "",
        SupplierClientId: "",
        SupplierPartyId: "",
    };

    constructor(public nav: NavController,
                public navParam: NavParams,
                public gasCard: GasCard) {
    }

    ngOnInit(): void {
        this.transParam.carNo = this.navParam.data.GasCardNo;
        this.transParam.SupplierName = this.navParam.data.SupplierName;
        this.gasCard.getGasPriceStep(this.navParam.data.SupplierClientId);
        this.maxGasNum = 0;
        this.totalPrice = 0;
        console.log('this.maxGasNum', this.maxGasNum);
    }

    keyInput(value): void {
        if (this.maxGasNum == 0) {
            let arr = this.gasCard.gasPriceStep;
            for (let i = 0; i < arr.length; i++) {
                this.maxGasNum = this.maxGasNum + parseFloat(arr[i].provide);
            }
        }
        console.log('i am maxGasNum', this.maxGasNum);

        if (value != "") {
            this.transParam.gasNum = value;
        }
    }

    getTotal(arr, maxNum) {
        let self = this;
        let num = maxNum;
        console.log(num);
        for (let i = 0; i < arr.length; i++) {
            if (num > parseFloat(arr[i].provide)) {
                self.totalPrice = this.totalPrice + parseFloat((parseFloat(arr[i].provide) * parseFloat(arr[i].unitPrice)).toFixed(2));
                num = num - parseFloat(arr[i].provide);
            } else {
                self.totalPrice = this.totalPrice + parseFloat((num * parseFloat(arr[i].unitPrice)).toFixed(2));
                return
            }
        }
    }

    searchStepPrice() {
        this.gasCard.getGasPriceStep(this.navParam.data.SupplierPartyId);
    }

    goNext() {
        let self = this;
        this.totalPrice = 0;
        this.getTotal(this.gasCard.gasPriceStep, parseFloat(this.transParam.gasNum));
        this.transParam.accountTypeName = this.gasCard.gasPayMethod.accountTypeName;
        this.transParam.gasPrice = this.totalPrice.toString();
        this.transParam.SupplierClientId = self.navParam.data.SupplierClientId;
        this.transParam.SupplierPartyId = self.navParam.data.SupplierPartyId;

        console.log(self.totalPrice);
        if (parseFloat(self.transParam.gasNum) > 0) {
            if (parseFloat(self.transParam.gasNum) > self.maxGasNum) {
                let str = "请输入小于" + this.maxGasNum + "的购气量";
                self.gasCard.showAlert('提示', str, ['确定']);
            } else {
                self.nav.push(GasCardCharge1Component, self.transParam);
            }
        } else {
            self.gasCard.showAlert('提示', '请输入购气量', ['确定']);
        }

    }
}

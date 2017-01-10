import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CompusCardCharge1Component} from '../compus-card-charge1/compus-card-charge1';
import {CompusCard} from '../../providers/compus-card';

@Component({
    selector: 'compus-card-charge',
    templateUrl: 'compus-card-charge.html'
})
export class CompusCardChargeComponent {
    compusCardObj: any;
    chooseMountNum: number = 0;
    chooseMount: number;

    constructor(public nav: NavController, public navParam: NavParams, public compusCard: CompusCard) {
        this.compusCardObj = this.navParam.data.compusCard;
        console.log(this.compusCardObj);
    }

    chooseMountFun(index) {
        this.chooseMountNum = index;
        if (index == 1) {
            this.chooseMount = 500;
        }
        if (index == 2) {
            this.chooseMount = 1000;
        }
        if (index == 3) {
            this.chooseMount = 2000;
        }
    }

    changeMountFun() {
        let self = this;
        self.chooseMountNum = 0;
    }


    goNext() {
        let self = this;
        let compusCardObj = self.compusCardObj;
        //accountTypeName/payChannelCode
        if (self.compusCard.compusPayMethod.accountTypeName) {
            if (self.chooseMount) {
                compusCardObj.chargeNum = self.chooseMount + "";
                let b;
                if (compusCardObj.chargeNum.indexOf('.') == -1) {
                    b = 0;
                } else {
                    b = compusCardObj.chargeNum.slice(compusCardObj.chargeNum.indexOf('.') + 1);
                }

                compusCardObj.chargeWay = self.compusCard.compusPayMethod.accountTypeName;
                compusCardObj.chargeWayNum = self.compusCard.compusPayMethod.payChannelCode;

                if (compusCardObj.chargeNum == '0' || compusCardObj.chargeNum == 'null' || JSON.parse(compusCardObj.chargeNum) <= 0 || b.length > 2) {
                    self.compusCard.showAlert('提示', '充值金额不合法，最多精确到分（小数点后最多2位）', ['确定']);
                } else {
                    // self.compusCard.compusOrder(compusCardObj,function () {
                    //     self.nav.push(CompusCardCharge1Component,{compusCard:compusCardObj});
                    // });
                    self.compusCard.setOrderAndPayObj(compusCardObj);
                    self.nav.push(CompusCardCharge1Component, {compusCard: compusCardObj});
                }
            } else {
                self.compusCard.showAlert('提示', '请选择或输入充值金额', ['确定']);
            }
        } else {
            console.log(self.compusCard.compusPayMethod);
        }
    };
}

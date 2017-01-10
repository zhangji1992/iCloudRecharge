import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GasCardCharge2Component} from '../gas-card-charge2/gas-card-charge2';
import {GasCard} from '../../providers/gas-card';

@Component({
    selector: 'gas-card-charge1',
    templateUrl: 'gas-card-charge1.html'
})
export class GasCardCharge1Component {
    gasdObj: any;

    constructor(public nav: NavController,
                public navParam: NavParams,
                public gasCard: GasCard) {

        console.log('sdfsdfsds', this.navParam);
    }

    goNext() {
        let self = this;
        self.gasCard.compusPaySec(this.navParam.data.SupplierPartyId, this.navParam.data.gasPrice, this.navParam.data.gasNum, this.navParam.data.SupplierClientId).then(function (data) {
            console.log('i am 002', data);
            if (data['retCode'] == '0000') {
                self.nav.push(GasCardCharge2Component);
            } else {
                self.gasCard.showAlert("提示", data['retMsg'], ["确定"]);
            }
        });
    }

}

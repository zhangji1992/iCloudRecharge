import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CompusCardCharge2Component} from '../compus-card-charge2/compus-card-charge2';
import {CompusCard} from '../../providers/compus-card';


@Component({
    selector: 'compus-card-charge1',
    templateUrl: 'compus-card-charge1.html'
})
export class CompusCardCharge1Component {
    compusCardObj: any;

    constructor(public nav: NavController,
                public navParam: NavParams,
                public compusCard: CompusCard) {
        this.compusCardObj = this.navParam.data.compusCard;
        console.log(this.compusCardObj);
    }

    goNext() {
        let self = this;
        self.compusCard.compusPaySec().then(function (data) {
            console.log(data);
            if (data == 1) {
                self.nav.push(CompusCardCharge2Component);
            } else {
                self.compusCard.showAlert("提示", data, ["确定"]);
            }
        });
    }

}

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CompusCard} from '../../providers/compus-card';
import {CompusCardAdd2Component} from '../compus-card-add2/compus-card-add2';

@Component({
    selector: 'compus-card-add1',
    templateUrl: 'compus-card-add1.html'
})
export class CompusCardAdd1Component {
    private mobilePhone: string;
    private verifyType: string;
    private nextStr: any;

    constructor(public nav: NavController,
                public navParam: NavParams,
                public compusCard: CompusCard) {

        this.mobilePhone = this.compusCard.addCompusCardPost.GuardianPhone;
        this.verifyType = "BindSchoolCard";
        this.nextStr = "下一步";
    }

    goNext() {
        this.nav.push(CompusCardAdd2Component);
    }

    confirmAfter(data) {
        console.log(data);
        this.nav.push(CompusCardAdd2Component);
    }
}

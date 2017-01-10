import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GasCard} from '../../providers/gas-card';
import {GasCardAdd2Component} from '../gas-card-add2/gas-card-add2';
import {User} from '../../../../modules/hxsmart-user/providers/user';

@Component({
    selector: 'gas-card-add1',
    templateUrl: 'gas-card-add1.html'
})
export class GasCardAdd1Component {
    private mobilePhone: string;
    private verifyType: string;
    private nextStr: any;

    constructor(public nav: NavController,
                public navParam: NavParams,
                public gasCard: GasCard,
                private user: User) {

        this.gasCard.addGasCardPost.GuardianPhone = this.user.getUserInfo().phone;
        this.gasCard.addGasCardPost.ClientPartyId = this.user.getUserInfo().id;
        this.mobilePhone = this.user.getUserInfo().phone;
        this.verifyType = "BindEmail";
        this.nextStr = "下一步";
    }

    goNext() {
        this.nav.push(GasCardAdd2Component);
    }

    confirmAfter(data) {
        console.log(data);
        this.nav.push(GasCardAdd2Component);
    }
}

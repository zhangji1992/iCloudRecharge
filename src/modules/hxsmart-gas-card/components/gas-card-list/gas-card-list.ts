import {Component, OnInit}           from '@angular/core';
import {NavController}             from 'ionic-angular';
import {GasCard}                   from '../../providers/gas-card';
import {GasCardChargeDetail}       from '../gas-card-charge-detail/gas-card-charge-detail';
import {GasCardChargeComponent}       from '../gas-card-charge/gas-card-charge';
import {User} from '../../../../modules/hxsmart-user/providers/user';

@Component({
    selector: 'gas-card-list',
    templateUrl: 'gas-card-list.html'
})
export class GasCardList implements OnInit {

    constructor(public gasCard: GasCard,
                public navCtr: NavController,
                private user: User) {
    }

    ngOnInit(): void {
        let userId = this.user.getUserInfo().id;
        this.gasCard.getGasCardList(userId);
    }

    goToCharge(param): void {
        this.navCtr.push(GasCardChargeComponent, param);
    }

    goToChargeDetail(param): void {
        this.navCtr.push(GasCardChargeDetail, param);
    }
}

import {Component, OnInit}           from '@angular/core';
import {GasCard}                 from '../../providers/gas-card';
import {NavController}                from 'ionic-angular';
import {GasCardDetail}           from '../gas-card-detail/gas-card-detail';
import {User} from '../../../../modules/hxsmart-user/providers/user';
import {GasCardAdd}           from '../gas-card-add/gas-card-add';

@Component({
    selector: 'gas-card-easy-list',
    templateUrl: 'gas-card-easy-list.html'
})
export class GasCardEasyList implements OnInit {

    constructor(private navCtr: NavController,
                private user: User,
                public gasCard: GasCard) {
    }

    ngOnInit(): void {
        let userId = this.user.getUserInfo().id;
        this.gasCard.getGasCardList(userId);
    }

    goToDetail(param): void {
        this.navCtr.push(GasCardDetail, param);
    }

    addGasCard(): void {
        this.navCtr.push(GasCardAdd);
    }
}

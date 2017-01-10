import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CompusCard} from '../../providers/compus-card';
import {CompusCardList} from '../private/compus-card-list/compus-card-list';
import {GasCardList} from '../../../hxsmart-gas-card/components/gas-card-list/gas-card-list';
import {TabsPage} from '../../../../pages/tabs/tabs';
import {EtcCardListComponent} from "../../../hxsmart-etc/components/etc-card-list/etc-card-list";

@Component({
    selector: 'compus-card',
    templateUrl: 'compus-card.html'
})
export class CompusCardComponent {

    constructor(public compusCard: CompusCard,
                public nav: NavController,
                public tabs: TabsPage) {
    }

    go() {
        this.compusCard.setUserID();
        if (this.compusCard.userID) {
            this.nav.push(CompusCardList);
        } else {
            this.compusCard.showAlert('提示', '查看校园卡模块需要先进行登录', ['确定']);
        }
    }

    goToPage() {
        this.compusCard.setUserID();
        if (this.compusCard.userID) {
            this.nav.push(GasCardList);
        } else {
            this.compusCard.showAlert('提示', '查看燃气卡模块需要先进行登录', ['确定']);
        }
    }

    goToEtc() {
        this.compusCard.setUserID();
        if (this.compusCard.userID) {
            this.nav.push(EtcCardListComponent);
        } else {
            this.compusCard.showAlert('提示', '查看ETC卡模块需要先进行登录', ['确定']);
        }
    }
}

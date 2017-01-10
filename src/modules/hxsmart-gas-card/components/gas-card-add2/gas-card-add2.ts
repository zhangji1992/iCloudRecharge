import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GasCard} from '../../providers/gas-card';
import {User} from '../../../../modules/hxsmart-user/providers/user';

@Component({
    selector: 'gas-card-add2',
    templateUrl: 'gas-card-add2.html'
})
export class GasCardAdd2Component {
    bindCardInfo: any;

    constructor(public nav: NavController,
                private gasCard: GasCard,
                private user: User) {
        this.bindCardInfo = this.gasCard.addGasCardPost;
    }

    add() {
        let self = this;
        let carNO = self.gasCard.addGasCardPost.CardNo;
        let ClientPartyId = self.gasCard.addGasCardPost.ClientPartyId;
        let SupplierPartyId = self.gasCard.addGasCardPost.SupplierPartyId;
        this.gasCard.bindGasCard(ClientPartyId, SupplierPartyId, carNO, function () {
            self.nav.popToRoot();
            /*let userId=self.user.getUserInfo().id;
             self.nav.remove(2,3);
             self.gasCard.getGasCardList(userId);*/
        });
    }
}

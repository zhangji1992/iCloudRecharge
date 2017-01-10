import {Component, OnInit} from '@angular/core';
import {EtcCard} from "../../providers/etc-card";
import {NavController} from "ionic-angular";
import {EtcCardAddComponent} from "../etc-card-add/etc-card-add";
import {User} from "../../../hxsmart-user/providers/user";
import {EtcCardDetailComponent} from "../etc-card-detail/etc-card-detail";

@Component({
    selector: 'etc-card-simple-list',
    templateUrl: 'etc-card-simple-list.html'
})
export class EtcCardSimpleListComponent implements OnInit {
    constructor(private etcCard: EtcCard,
                private user: User,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        let param = {
            ClientPartyId: this.user.getUserInfo().id,
            ClientStatus: '1'
        };
        this.etcCard.getBoundEtc(param)
            .catch(err => this.etcCard.toast(`发生异常${err}`));        //发生异常
    }

    goToDetail(card: any) {
        this.navCtrl.push(EtcCardDetailComponent, card);
    }

    addEtcCard() {
        this.navCtrl.push(EtcCardAddComponent);
    }

}

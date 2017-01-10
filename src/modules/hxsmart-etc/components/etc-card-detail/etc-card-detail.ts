import {Component} from '@angular/core';
import {EtcCard} from "../../providers/etc-card";
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../../hxsmart-user/providers/user";

@Component({
    selector: 'etc-card-detail',
    templateUrl: 'etc-card-detail.html'
})
export class EtcCardDetailComponent {

    constructor(private etcCard: EtcCard,
                private user: User,
                private navParams: NavParams,
                private navCtrl: NavController) {
    }

    unBind() {
        // console.log('param', this.navParams.data);

        let param1 = {
            ClientPartyId: this.user.getUserInfo().id,
            ETCCardNo: this.navParams.get('ETCCardNo')
        };
        this.etcCard.unBindEtc(param1)
            .then(() => this.navCtrl.pop())                         //返回上个页面
            .catch(err => this.etcCard.toast(err || '发生异常'));    //发生异常
    }
}

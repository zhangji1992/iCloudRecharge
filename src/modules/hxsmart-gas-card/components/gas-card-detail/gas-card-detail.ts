import {Component, OnInit}           from '@angular/core';
import {NavParams, NavController}                from 'ionic-angular';
import {GasCard}             from '../../providers/gas-card';

@Component({
    selector: 'gas-card-detail',
    templateUrl: 'gas-card-detail.html'
})
export class GasCardDetail implements OnInit {

    constructor(private navParams: NavParams,
                private navCtrl: NavController,
                private gasCard: GasCard) {
    }

    ngOnInit(): void {
        console.log('i am navParams', this.navParams);

    }

    removeBind() {
        let self = this;
        this.gasCard.cancleBindCard(self.navParams.data.GasCardNo, self.gasCard.userID, function () {
            self.gasCard.getGasCardList(self.gasCard.userID);
            self.navCtrl.pop();
        })
    }
}

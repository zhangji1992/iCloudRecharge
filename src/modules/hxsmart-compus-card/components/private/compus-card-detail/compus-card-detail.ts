import {Component, OnInit}           from '@angular/core';
import {CompusCard}                 from '../../../providers/compus-card';
import {NavParams, NavController, AlertController}                from 'ionic-angular';

@Component({
    selector: 'compus-card-detail',
    templateUrl: 'compus-card-detail.html'
})
export class CompusCardDetail implements OnInit {

    constructor(public compusCard: CompusCard,
                private navParams: NavParams,
                private navCtrl: NavController,
                private alertCtrl: AlertController) {
    }

    ngOnInit(): void {
        console.log('i am navParams', this.navParams);

    }

    removeBind(): void {
        let that = this;
        this.compusCard.cancleBindCard(this.navParams.data.CardNo, this.navParams.data.ClientPartyId).then(res => {
            console.log(33333, res);
            let alert = that.alertCtrl.create({
                title: '提示',
                message: res.retMsg,
                buttons: [{
                    text: '确定',
                    handler: () => {
                        this.compusCard.getBindCompusCard();
                        that.navCtrl.pop();
                    }
                }]
            });
            alert.present();
        }).catch(err => {
            console.log(err);
            let alert = that.alertCtrl.create({
                title: '提示',
                message: err.retMsg,
                buttons: [{
                    text: '确定',
                    handler: () => {
                        this.compusCard.getBindCompusCard();
                        that.navCtrl.pop();
                    }
                }]
            });
            alert.present();
        });
    }
}

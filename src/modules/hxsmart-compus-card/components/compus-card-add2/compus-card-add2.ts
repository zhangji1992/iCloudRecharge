import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {CompusCard} from '../../providers/compus-card';

@Component({
    selector: 'compus-card-add2',
    templateUrl: 'compus-card-add2.html'
})
export class CompusCardAdd2Component {
    bindCardInfo: any;

    constructor(public nav: NavController,
                public compusCard: CompusCard,
                public alertCtrl: AlertController) {
        this.bindCardInfo = this.compusCard.addCompusCardPage;
    }

    add() {
        let self = this;
        this.compusCard.bindCompusCard(function () {
            let alert = self.alertCtrl.create({
                title: '提示',
                message: '校园卡添加成功',
                enableBackdropDismiss: false,
                buttons: [{
                    text: '确定',
                    handler: () => {
                        self.nav.popToRoot();
                        /*self.nav.remove(2,3);
                         self.compusCard.getBindCompusCard();*/
                    }
                }]
            });
            alert.present();
        });
    }
}

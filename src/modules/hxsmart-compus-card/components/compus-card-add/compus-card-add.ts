import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {CompusCard} from '../../providers/compus-card';
import {CompusCardAdd1Component} from '../compus-card-add1/compus-card-add1';
import {CompusSelectComponent} from '../compus-select/compus-select';

@Component({
    selector: 'compus-card-add',
    templateUrl: 'compus-card-add.html'
})
export class CompusCardAddComponent {
    Compus: string;
    CompusCardNo: string;

    constructor(public nav: NavController,
                public modalCtrl: ModalController,
                public compusCard: CompusCard) {
    }

    selectCompus() {
        let self = this;
        let selectCompusModal = this.modalCtrl.create(CompusSelectComponent);
        selectCompusModal.onDidDismiss(data => {
            if (data.supplierName) {
                console.log(data);
                self.compusCard.addCompusCardPost.SupplierPartyId = data.partyId;
                self.Compus = data.supplierName;
            }
        });
        selectCompusModal.present();
    };

    goNext() {
        //this.nav.insertPages(3,[{page:CompusCardAdd1Component},{page:CompusCardAdd1Component}]);

        let self = this;
        if (self.Compus == '' || self.Compus == undefined) {
            self.compusCard.showAlert('提示', '请选择学校', ['确定']);
            return;
        }
        if (self.CompusCardNo == '' || self.CompusCardNo == undefined) {
            self.compusCard.showAlert('提示', '请输入校园卡卡号', ['确定']);
            return;
        }
        self.compusCard.addCompusCardPost.CardNo = self.CompusCardNo + "";
        self.compusCard.addCompusCardPage.cardNo = self.CompusCardNo;
        self.compusCard.compusCardDet1(self.CompusCardNo, function () {
            self.compusCard.addCompusCardPage.school = self.Compus;
            self.nav.push(CompusCardAdd1Component);
        });
    }

    ionViewCanLeave() {

    }

}

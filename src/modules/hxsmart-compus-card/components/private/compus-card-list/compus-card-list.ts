import {Component, OnInit}           from '@angular/core';
import {CompusCard}                 from '../../../providers/compus-card';
import {NavController}                from 'ionic-angular';
import {CompusCardChargeDetail}           from '../compus-card-charge-detail/compus-card-charge-detail';
import {CompusCardConsumeDetail}           from '../compus-card-consume-detail/compus-card-consume-detail';
import {CompusCardChargeComponent} from '../../compus-card-charge/compus-card-charge';

import {CompusCourseComponent} from '../../compusService/compus-course/compus-course';
import {CompusMarkComponent} from '../../compusService/compus-mark/compus-mark';
import {CompusPaymentComponent} from '../../compusService/compus-payment/compus-payment';
import {CompusRecordComponent} from '../../compusService/compus-record/compus-record';

@Component({
    selector: 'compus-card-list',
    templateUrl: 'compus-card-list.html'
})
export class CompusCardList implements OnInit {

    constructor(public compusCard: CompusCard,
                private navCtr: NavController) {
    }

    ngOnInit(): void {
        this.compusCard.getBindCompusCard();
    }

    goToCharge(obj): void {
        console.log(obj);
        this.navCtr.push(CompusCardChargeComponent, {compusCard: obj});
    }

    goToChargeDetail(param): void {
        this.navCtr.push(CompusCardChargeDetail, param);
    }

    goToConsumeDetail(param): void {
        this.navCtr.push(CompusCardConsumeDetail, param);
    }


    goToCourse(): void {
        this.navCtr.push(CompusCourseComponent);
    }

    goToMark(): void {
        this.navCtr.push(CompusMarkComponent);
    }

    goToPayment(): void {
        this.navCtr.push(CompusPaymentComponent);
    }

    goToRecord(): void {
        this.navCtr.push(CompusRecordComponent);
    }
}

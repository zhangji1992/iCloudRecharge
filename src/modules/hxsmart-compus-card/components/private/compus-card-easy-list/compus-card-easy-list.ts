import {Component, OnInit}           from '@angular/core';
import {CompusCard}                 from '../../../providers/compus-card';
import {NavController}                from 'ionic-angular';
import {CompusCardDetail}           from '../compus-card-detail/compus-card-detail';
import {CompusCardAddComponent}           from '../../compus-card-add/compus-card-add';

@Component({
    selector: 'compus-card-easy-list',
    templateUrl: 'compus-card-easy-list.html'
})
export class CompusCardEasyList implements OnInit {

    constructor(public compusCard: CompusCard,
                private navCtr: NavController) {
    }

    ngOnInit(): void {
        this.compusCard.getBindCompusCard();
    }

    goToDetail(param): void {
        this.navCtr.push(CompusCardDetail, param);
    }

    addCompusCard(): void {
        this.navCtr.push(CompusCardAddComponent);
    }
}

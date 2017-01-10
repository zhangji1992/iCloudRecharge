import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {CGB2Account} from '../../../hxsmart-CGB-2account/providers/CGB-2account';

@Component({
    selector: 'cash',
    templateUrl: 'cash.html'
})
export class cash {
    private account1: any;
    public hero = {};

    constructor(public navCtrl: NavController, public account: CGB2Account, public navParams: NavParams) {

    }

    ngOnInit() {
        this.account1 = this.navParams.get('account');
        console.log(this.account1)
    }
}

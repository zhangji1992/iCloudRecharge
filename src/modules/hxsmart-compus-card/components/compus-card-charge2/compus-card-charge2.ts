import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'compus-card-charge2',
    templateUrl: 'compus-card-charge2.html'
})
export class CompusCardCharge2Component {
    constructor(public nav: NavController) {
        let self = this;
        setTimeout(function () {
            self.nav.popToRoot();
            //self.nav.remove(2,3);
        }, 3000);
    }

}

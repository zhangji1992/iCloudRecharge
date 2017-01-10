import {Component} from '@angular/core';

/*
 Generated class for the CompusPayment component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'compus-payment',
    templateUrl: 'compus-payment.html'
})
export class CompusPaymentComponent {

    text: string;

    constructor() {
        console.log('Hello CompusPayment Component');
        this.text = 'Hello World';
    }

}

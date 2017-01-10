import {Component} from '@angular/core';

/*
 Generated class for the CompusRecord component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'compus-record',
    templateUrl: 'compus-record.html'
})
export class CompusRecordComponent {

    text: string;

    constructor() {
        console.log('Hello CompusRecord Component');
        this.text = 'Hello World';
    }

}

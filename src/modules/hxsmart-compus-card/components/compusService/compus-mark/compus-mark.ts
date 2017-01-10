import {Component} from '@angular/core';

/*
 Generated class for the CompusMark component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'compus-mark',
    templateUrl: 'compus-mark.html'
})
export class CompusMarkComponent {

    text: string;

    constructor() {
        console.log('Hello CompusMark Component');
        this.text = 'Hello World';
    }

}

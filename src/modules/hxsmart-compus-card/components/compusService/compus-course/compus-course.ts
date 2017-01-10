import {Component} from '@angular/core';

/*
 Generated class for the CompusCourse component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'compus-course',
    templateUrl: 'compus-course.html'
})
export class CompusCourseComponent {

    text: string;

    constructor() {
        console.log('Hello CompusCourse Component');
        this.text = 'Hello World';
    }

}

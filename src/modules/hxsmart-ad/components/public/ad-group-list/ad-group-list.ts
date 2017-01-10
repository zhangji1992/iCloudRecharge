/**
 * Created by Jimmy Luo  on 2016/11/23.
 */
import {Component, OnInit} from '@angular/core';
import {Ad} from "../../../providers/ad";

@Component({
    selector: 'ad-group-list',
    templateUrl: 'ad-group-list.html'
})
export class AdGroupList implements OnInit {
    /*groupAdData: any;*/
    constructor(public adService: Ad,) {
    }

    ngOnInit() {
        /*this.adService.init().then(adData => {
         this.groupAdData = adData && adData.groupActAndNews;
         console.log('groupAdData', this.groupAdData);
         });*/
    }
}

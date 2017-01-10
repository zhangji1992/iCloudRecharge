import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ADURL} from "../../../providers/ad-interface";
import {imageUtilService} from "../../../providers/image-util.service";

@Component({
    selector: 'ad-detail',
    templateUrl: 'ad-detail.html'
})
export class AdDetail {
    imgSrc: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public imageUtil: imageUtilService,) {
        console.log('i am navparams', this.navParams);

    }

    ngOnInit(): void {
        this.imgSrc = ADURL.imgUrl;
    }

}

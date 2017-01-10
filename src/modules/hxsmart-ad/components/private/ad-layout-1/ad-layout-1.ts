/**
 * Created by Jimmy Luo  on 2016/11/23.
 */
import {Component, OnInit, Input, AfterContentChecked} from '@angular/core';
import {NavController} from "ionic-angular";
import {Ad} from "../../../providers/ad";
import {AdDetail} from "../ad-detail/ad-detail";
import {ADURL} from "../../../providers/ad-interface";

@Component({
    selector: 'ad-layout-1',
    templateUrl: 'ad-layout-1.html'
})
export class AdLayout1 implements OnInit, AfterContentChecked {
    @Input() adData: any[];
    imgSrc: string = '';

    constructor(public adService: Ad,
                public navCtrl: NavController,) {
    }

    ngOnInit() {

        this.imgSrc = this.adService.isLocalHomeAdData ? '' : ADURL.imgUrl;
        console.log("adData", this.adData);
    }

    ngAfterContentChecked() {
        this.imgSrc = this.adService.isLocalHomeAdData ? '' : ADURL.imgUrl;
    }

    //广告详情
    goToDetail(id): void {
        let param = {"AdvertIds": id};
        this.adService.getDetail(param).then(data => {
            console.log('i am imgDetail', data);
            this.navCtrl.push(AdDetail, {content: data.context});
        });
    }
}

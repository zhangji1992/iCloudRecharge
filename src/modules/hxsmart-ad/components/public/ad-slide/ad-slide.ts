import {Component, OnInit, AfterContentChecked}           from '@angular/core';
import {NavController, ToastController}              from 'ionic-angular';
import {Ad}                         from "../../../providers/ad";
import {AdDetail}          from "../../private/ad-detail/ad-detail";
import {ADURL} from "../../../providers/ad-interface";


@Component({
    selector: 'ad-slide',
    templateUrl: 'ad-slide.html'
})
export class AdSlide implements OnInit, AfterContentChecked {
    adList: any[];
    imgSrc: string = '';
    adSlideOptions = {
        loop: true,
        pager: true
    };

    constructor(public navCtrl: NavController,
                public adService: Ad,
                public toastCtrl: ToastController) {
    }

    //组件初始化广告列表
    ngOnInit(): void {
        console.log('ad-list.component初始化');
        this.imgSrc = this.adService.isLocalHomeAdData ? '' : ADURL.imgUrl;
        /*this.adService.init().then(adData => {
         this.adList = adData && adData.groupFlow;
         console.log('adList:', this.adList);
         });*/

        //假数据测试
        /*let adData = this.adService.homeAdData;
         this.adList = adData && adData.groupFlow;
         console.log('adList:', this.adList);*/

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
        console.log(id);
        this.adSlideOptions.loop = false;
    }
}


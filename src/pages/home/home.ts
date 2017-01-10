import {Component} from '@angular/core';
import {Ad} from "../../modules/hxsmart-ad/providers/ad";
import {AppUpdateService} from "../../modules/hxsmart-tool/providers/app-update";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    changeLog: any;

    constructor(private adService: Ad,
                private appUpdate: AppUpdateService,
                private sanitizer: DomSanitizer) {
        appUpdate.checkUpdate('1.0.0').then(res => {//test by Jimmy, don't remove
            console.log('是否有更新', res);
            this.changeLog = sanitizer.bypassSecurityTrustHtml(appUpdate.latestAppDetail.changeLog);
        })
    }

    doInfinite(infiniteScroll): void {
        console.log("homeAdData", this.adService.homeAdData);
        let len = this.adService.homeAdData.length;
        let param = {"lastRec": this.adService.homeAdData[len - 1].homepageLayoutId + '', "number": "10"};

        this.adService.getAdHomeList(param).then(res => {
            try {
                if (res.context.length > 0) {
                    this.adService.homeAdData = this.adService.homeAdData.concat(res.context);
                    infiniteScroll.complete();
                } else {
                    infiniteScroll.enable(false);
                }
            } catch (err) {
                console.log(err);
                infiniteScroll.enable(false);
            }


        }, err => {
            console.log('加载失败');
            //infiniteScroll.complete();
            infiniteScroll.enable(false);
        });
    }

}

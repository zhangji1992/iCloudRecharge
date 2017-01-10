import {Component, OnInit} from '@angular/core';
import {Platform, ToastController} from "ionic-angular";
import {AboutService} from "../../providers/aboutService";

@Component({
    selector: 'latest-version-info',
    templateUrl: 'latest-version-info.html'
})

export class LatestVersionInfo implements OnInit {
    private platformType: string = '';
    private latestVer: string = '';
    private currentVer: string = '';

    constructor(public aboutService: AboutService,
                private toastCtrl: ToastController,
                public platform: Platform) {
    }

    ngOnInit() {
        this.getVer();
    }

    //错误回调
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getVer() {
        if (this.platform.is('ios')) {
            this.platformType = 'iOS';
        } else if (this.platform.is('android')) {
            this.platformType = 'android';
        }

        this.aboutService.getLatestVer(this.platformType)
            .then(ver => this.latestVer = ver)
            .catch(this.handleError);

        if (this.platform.is('mobileweb')) {
            console.error('该方法只适用于移动端');
            return;
        }

        this.aboutService.getCurrentVer()
            .then(ver => this.currentVer = ver)
            .catch(this.handleError);
    }

    update() {
        let toast = this.toastCtrl.create({
            message: '功能开发中，敬请期待！',
            duration: 1500,
            position: 'middle'
        });
        toast.present();
    }
}

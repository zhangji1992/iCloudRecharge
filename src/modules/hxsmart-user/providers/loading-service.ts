import {Injectable} from "@angular/core";
import {LoadingController} from "ionic-angular";
@Injectable()
export class LoadingService {
    constructor(public loadingCtrl: LoadingController) {
    }

    public basicLoading(msg: string): any {
        let loader = this.loadingCtrl.create({
            content: msg,
            duration: 3000,
            // dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }
}

import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";
@Injectable()
export class ToastService {
    constructor(public toastCtrl: ToastController) {
    }

    presentToast(params): void {
        let toast = this.toastCtrl.create({
            message: params.msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
}

import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";
import {User} from "../../providers/user";
import {UserCenter} from "../user-center/user-center";
@Component({
    selector: 'user-complete-profile',
    templateUrl: 'user-complete-profile.html'
})

export class UserCompleteProfile {
    private verifyType: string;
    private nextStr: any;

    constructor(public navCtrl: NavController,
                public alert: AlertService,
                public toast: ToastService,
                public userService: User) {
    }

    ngOnInit() {
        this.verifyType = "BindEmail";
        this.nextStr = "save";
    }


    confirmAfter(data) {
        console.log(data);
        this.userService.bindEmail({
            "verifyCode": data.code,
            "email": data.email
        }).then(res => {
            console.log(res);
            this.navCtrl.push(UserCenter);
            this.toast.presentToast({msg: "邮箱绑定成功!"});
        }, err => this.alert.presentAlert({msg: err}));
    }
}

import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../providers/user";
import {ToastService} from "../../providers/toast-service";
import {UserBindMobile} from "../user-bind-mobile/user-bind-mobile";
import {UserCenter} from "../user-center/user-center";
import {AlertService} from "../../providers/alert-service";
@Component({
    selector: 'user-bind-email',
    templateUrl: 'user-bind-email.html'
})
export class UserBindEmail {
    private confirmEmailTitle: string;
    private confirmEmailTip: string;
    private verifyType: string;
    private emailAdd: string;
    private nextStr: any;

    constructor(public navCtrl: NavController,
                public userSeivice: User,
                public navParams: NavParams,
                public toast: ToastService,
                public alert: AlertService) {
    }


    ngOnInit() {
        let page = this.navParams.get("page");
        console.log(page);
        if (page == "modifyEmail") {
            this.confirmEmailTitle = "修改邮箱";
            this.confirmEmailTip = "更换绑定邮箱";
            this.verifyType = "BindEmail";
            this.nextStr = "complete";
        } else if (page == "modifyMobile") {
            console.log("修改手机号", this.userSeivice.getUserInfo().email);
            this.confirmEmailTitle = "修改手机号";
            this.confirmEmailTip = "邮箱验证方式";
            this.verifyType = "ResetMobilePhone";
            this.emailAdd = this.userSeivice.getUserInfo().email;
            this.nextStr = "other";
        }
    }

    confirmAfter(data) {
        console.log(data);
        if (data.type == "BindEmail") {
            this.userSeivice.bindEmail({
                "verifyCode": data.code,
                "email": data.email
            }).then(res => {
                console.log(res);
                this.toast.presentToast({msg: "邮箱修改成功"});
                this.navCtrl.push(UserCenter);
            }, err => this.alert.presentAlert({msg: err}));
        } else if (data.type == "ResetMobilePhone") {
            this.navCtrl.push(UserBindMobile, {page: "modifyMobile"})
        }
    }
}

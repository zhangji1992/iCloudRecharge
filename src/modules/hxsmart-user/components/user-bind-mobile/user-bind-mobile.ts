import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {User} from "../../providers/user";
import {UserBindEmail} from "../user-bind-email/user-bind-email";
import {ToastService} from "../../providers/toast-service";
import {UserCenter} from "../user-center/user-center";
import {AlertService} from "../../providers/alert-service";
@Component({
    selector: 'user-bind-mobile',
    templateUrl: 'user-bind-mobile.html'
})
export class UserBindMobile {
    private confirmMobileTitle: string;
    private confirmMobileTip: string;
    private mobilePhone: string;
    private verifyType: string;
    private nextStr: any;

    constructor(public navParams: NavParams,
                public navCtrl: NavController,
                public userService: User,
                public toast: ToastService,
                public alert: AlertService) {
    }


    ngOnInit() {
        let page = this.navParams.get("page");
        if (page == "modifyEmail") {
            this.confirmMobileTitle = "修改邮箱";
            this.confirmMobileTip = "手机验证方式";
            this.mobilePhone = this.userService.getUserInfo().phone;
            this.verifyType = "BindEmail";
            this.nextStr = "other";
        } else if (page == "modifyMobile") {
            this.confirmMobileTitle = "修改手机号";
            this.confirmMobileTip = "更换绑定手机号";
            this.verifyType = "ResetMobilePhone";
            this.nextStr = "complete";
        }
    }

    confirmAfter(data) {
        console.log(data);
        if (data.type == "BindEmail") {
            this.navCtrl.push(UserBindEmail, {page: "modifyEmail"});
        } else if (data.type == "ResetMobilePhone") {
            this.userService.modifyMobile({
                "verifyCode": data.code,
                "phone": data.phone
            }).then(res => {
                console.log(res);
                this.toast.presentToast({msg: "手机号修改成功"});
                this.navCtrl.push(UserCenter);
            }, err => {
                if (err == "修改手机和修改邮箱之间需有一天的间隔！") {
                    let alt = {
                        altTitle: "提示",
                        altMsg: err,
                        altBtn: {
                            text: "确定",
                            handler: () => {
                                this.navCtrl.push(UserCenter);
                            }
                        }
                    };
                    this.alert.presentBasicAlert(alt);
                } else {
                    this.alert.presentAlert({msg: err});
                }
            });
        }
    }
}

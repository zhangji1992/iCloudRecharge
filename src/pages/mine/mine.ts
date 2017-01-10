import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Feedback} from '../../modules/hxsmart-about/components/feedback/feedback';
import {User} from "../../modules/hxsmart-user/providers/user";
import {UserCenter} from "../../modules/hxsmart-user/components/user-center/user-center";
import {FieldCardList} from '../../modules/hxsmart-field-card/components/field-card-list/field-card-list';
import {PayAccountList} from '../../modules/hxsmart-pay-account/components/pay-account-list/pay-account-list';
import {AlertService} from "../../modules/hxsmart-user/providers/alert-service";
import {HxsmartSharing} from "../../modules/hxsmart-native/providers/hxsmart-native";
import {TodoList} from "../../modules/hxsmart-todo/components/todo-list/todo-list";
import {MyMessagesService} from "../../modules/hxsmart-my-message/providers/messages";
import {MyMessage} from "../../modules/hxsmart-my-message/components/my-message/my-message";
import {Todo} from "../../modules/hxsmart-todo/providers/todo";
import {AboutApp} from "../../modules/hxsmart-about/components/about-app/about-app";
import {LatestVersionInfo} from "../../modules/hxsmart-about/components/latest-version-info/latest-version-info";
import {ToastService} from "../../modules/hxsmart-user/providers/toast-service";

@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class Mine {

    constructor(public navCtrl: NavController,
                public userService: User,
                public message: MyMessagesService,
                public alert: AlertService,
                public toast: ToastService,
                public share: HxsmartSharing,
                public platform: Platform,
                public todoService: Todo) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ionViewDidEnter() {
        console.log("进入我的页面", this.userService.getUserInfo().phone);
        if (this.userService.getUserInfo().phone) {
            this.todoService.getTodoNum().then(
                res => console.log(res),
                err => {
                    console.log(err);
                    this.alert.presentAlert({msg: err});
                }
            );
        }
        console.log('进入', this.userService.getUserInfo().status);
        if (this.userService.getUserInfo().status) {
            this.message.getUnreadNum();
        }
    }

    toPay() {//跳转到我的支付账户
        this.navCtrl.push(PayAccountList);
    }

    goMessages() {
        this.navCtrl.push(MyMessage);
    }

    goFeedback() {
        this.navCtrl.push(Feedback);
    }

    goAboutApp() {
        this.navCtrl.push(AboutApp);
    }

    goLatestVer() {
        this.navCtrl.push(LatestVersionInfo);
    }

    goTest() {
        this.navCtrl.push(UserCenter);
    }

    Share() {
        // console.log('test', this.platform.is('android'), this.platform.is('ios'));
        if (!(this.platform.is('android') || this.platform.is('ios')) || this.platform.is('mobileweb')) {
            console.error('该方法只适用于移动端');
            return;
        }

        let params = {
            message: '点击下载云充值APP:',
            url: 'www.hao123.com'
        };
        this.share.sharing(params)
            .then(data => console.log('分享成功', data))
            .catch(this.handleError);
    }

    //测试登录，页面变化情况
    // test() {
    //     this.userService.loginTest({"phone": "15538019677", "pwd": "111111"}).then(
    //         res => {
    //             console.log('登陆成功', res);
    //             this.message.getUnreadNum();
    //         },
    //         err => console.log('登录失败', err));
    // }

    gotoFieldCard() {
        console.log(this.navCtrl);
        this.navCtrl.push(FieldCardList)
    }

    logout() {
        let altParam = {
            altTitle: "退出登录",
            altMsg: "确定退出登录?",
            altBtns: [{
                text: "确定",
                handler: () => {
                    this.userService.loginOut()
                        .then((res) => {
                            console.log('ogout success', res);
                        }, (err) => {
                            this.toast.presentToast({msg: err});
                            // this.navCtrl.push(UserLogin);
                        });
                }
            }, {
                text: "取消",
                handler: () => {
                    console.log("取消退出!");
                }
            }]
        };
        this.alert.presentBasicAlert(altParam);

    }

    goTodo(): void {
        this.navCtrl.push(TodoList);
    }
}

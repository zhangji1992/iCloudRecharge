import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../../hxsmart-user/providers/user";
import {Component} from "@angular/core";
import {CGB2Account} from "../../providers/CGB-2account";
import {CGB2accountBindSuccess} from "../CGB-2account-bind-success/CGB-2account-bind-success";

@Component({
    selector: 'CGB-2account-real-name-checked',
    templateUrl: 'CGB-2account-real-name-checked.html'
})
export class CGB2accountRealNameChecked {
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public account: CGB2Account,
                public user: User) {
    }

    confirmAfter() {
        console.log('输出函数成功');
        this.account.bindExitAccount({
            partyId: this.user.getUserInfo().id,
            certNo: this.navParams.get('certNo')
        }).then(
            () => {
                this.navCtrl.push(CGB2accountBindSuccess, {"name": this.navParams.get('name')});
            },
            (err) => {
                console.log(err);
            }
        );
    }
}

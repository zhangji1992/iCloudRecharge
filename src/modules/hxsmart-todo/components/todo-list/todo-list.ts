import {Component} from "@angular/core";
import {Todo} from "../../providers/todo";
import {NavController} from "ionic-angular";
import {UserSetPayPwd} from "../../../hxsmart-user/components/user-set-pay-pwd/user-set-pay-pwd";
import {UserCompleteProfile} from "../../../hxsmart-user/components/user-complete-profile/user-complete-profile";
import {CompusCardList} from "../../../hxsmart-compus-card/components/private/compus-card-list/compus-card-list";
import {GasCardList} from "../../../hxsmart-gas-card/components/gas-card-list/gas-card-list";
import {HxsmartMap} from "../../../hxsmart-native/providers/plugins/hxsmart-map";
import {EtcCardListComponent} from "../../../hxsmart-etc/components/etc-card-list/etc-card-list";
@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.html'
})
export class TodoList {
    public abc = "1234";

    constructor(public navCtrl: NavController,
                public todoService: Todo,
                public map: HxsmartMap) {
    }

    ionViewWillEnter(): void {
        this.todoService.todoObject.showGasCard = false;
        this.todoService.todoObject.gasCardList = [];
        this.todoService.todoObject.showBindEmail = false;
        this.todoService.todoObject.showSchoolCard = false;
        this.todoService.todoObject.schoolCardList = [];
        this.todoService.todoObject.showPayPwd = false;
        this.todoService.todoObject.showWriteGasCard = false;
        this.todoService.todoObject.writeGasCardList = [];
        this.todoService.todoObject.showWriteSchoolCard = false;
        this.todoService.todoObject.schoolCardList = [];
        this.todoService.getTodoContent().then(
            res => console.info(res),
            err => console.info(err)
        );
    }

    setPayPwd() {
        console.log("去设置密码");
        this.navCtrl.push(UserSetPayPwd);
    }

    setEmail() {
        console.log("绑定邮箱");
        this.navCtrl.push(UserCompleteProfile);
    }

    searchAround() {
        console.log("查找附近");
        this.map.openMap()
            .then(
                (res) => {
                    console.log('打开地图成功', res)
                },
                (err) => {
                    console.log('打开地图失败', err)
                }
            )
    }

    retrunGasMoney() {
        this.navCtrl.push(GasCardList);
        console.log("退款");
    }

    retrunSchoolMoney() {
        this.navCtrl.push(CompusCardList);
    }

    retrunETCMoney() {
        this.navCtrl.push(EtcCardListComponent);
    }
}

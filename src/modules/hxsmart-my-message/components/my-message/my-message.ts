import {Component, OnInit} from "@angular/core";
import {MyMessagesService} from "../../providers/messages";
import {Refresher, NavController} from "ionic-angular";

@Component({
    selector: 'my-message',
    templateUrl: 'my-message.html'
})
export class MyMessage implements OnInit {
    constructor(public message: MyMessagesService,
                public navCtrl: NavController) {
    }

    ngOnInit() {
        this.message.doRefresh();
    }

    //下拉刷新列表
    doRefresh(refresh: Refresher) {
        this.message.doRefresh()
            .then(data => {
                refresh.complete();
            });
    }

    goBack() {
        this.navCtrl.pop();
    }

    clear() {
        this.message.clear();
    }
}

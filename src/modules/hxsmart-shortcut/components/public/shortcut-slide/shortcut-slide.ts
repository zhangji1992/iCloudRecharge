import {Component, ViewChild, OnInit} from '@angular/core';
import {ModalController, Slides, NavController, ToastController} from 'ionic-angular';
import {ShortcutDetail} from '../../private/shortcut-detail/shortcut-detail';
import {Shortcut} from "../../../providers/shortcut";
import {CompusCardList} from "../../../../hxsmart-compus-card/components/private/compus-card-list/compus-card-list";
import {User} from "../../../../hxsmart-user/providers/user";
import {GasCardList} from "../../../../hxsmart-gas-card/components/gas-card-list/gas-card-list";
import {Feedback} from "../../../../hxsmart-about/components/feedback/feedback";
import {PayAccountList} from "../../../../hxsmart-pay-account/components/pay-account-list/pay-account-list";
import {CompusCardAddComponent} from "../../../../hxsmart-compus-card/components/compus-card-add/compus-card-add";
import {GasCardAdd} from "../../../../hxsmart-gas-card/components/gas-card-add/gas-card-add";

@Component({
    selector: 'shortcut-slide',
    templateUrl: 'shortcut-slide.html'
})
export class ShortcutSlide implements OnInit {
    //模板变量
    @ViewChild('mySlider') slider: Slides;

    slideIndex: number = 0;

    slideOptions = {
        loop: false,  //弹跳，默认false
        pager: false  //分页，默认false
    };

    constructor(public shortcut: Shortcut,
                public modalCtrl: ModalController,
                public user: User,
                public toastCtrl: ToastController,
                public navCtrl: NavController) {
    }

    /**
     * 吐丝
     * @param msg {string} 吐丝信息
     */
    private toast(msg: string): void {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
        });
        toast.present();
    }

    ngOnInit() {
        this.shortcut.getList('shortcut');
    }

    onSlideChanged() {
        this.slideIndex = this.slider.getActiveIndex();
    }

    redirect(item: any) {
        if (item.id != 6) {
            if (!this.user.getUserInfo().id) {
                this.toast('请登录后查看');
                return;
            }
        }

        switch (item.redirect) {
            case 'CompusCardList':
                this.navCtrl.push(CompusCardList);
                break;
            case 'GasCardList':
                this.navCtrl.push(GasCardList);
                break;
            case 'PayAccountList':
                this.navCtrl.push(PayAccountList);
                break;
            case 'CompusCardAddComponent':
                this.navCtrl.push(CompusCardAddComponent);
                break;
            case 'GasCardAdd':
                this.navCtrl.push(GasCardAdd);
                break;
            case 'Feedback':
                this.navCtrl.push(Feedback);
                break;
        }
    }

    more() {
        let modal = this.modalCtrl.create(ShortcutDetail);
        if (this.slider) {
            modal.onWillDismiss(() => {
                if (this.slider) {
                    this.slider.slideTo(0);
                }
            });
        }

        modal.present();
    }
}

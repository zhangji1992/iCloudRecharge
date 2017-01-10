import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {EtcCard} from "../../providers/etc-card";
import {User} from "../../../hxsmart-user/providers/user";

@Component({
    selector: 'etc-card-add',
    templateUrl: 'etc-card-add.html'
})
export class EtcCardAddComponent {
    etcType: string;
    etcCardNo: string;
    stepNow: number = 1;

    phone: string = '';
    etcCardDetails = {
        HoldCardName: '',
        CarNum: '',
        CarDriveNum: '',
    };

    constructor(private navCtrl: NavController,
                private etcCard: EtcCard,
                private user: User) {
    }

    openModel() {
        this.etcCard.toast('功能开发中，敬请期待！');
    }

    goBack() {
        switch (this.stepNow) {
            case 3:
                console.log('goBack step2');
                this.stepNow = 2;
                break;
            case 2:
                console.log('goBack step1');
                this.stepNow = 1;
                break;
            default:
                console.log('goBack component');
                this.navCtrl.pop();
        }
    }

    goNext() {
        switch (this.stepNow) {
            case 1:
                let param1 = {
                    ETCCardNo: this.etcCardNo
                };

                //查询etc卡号是否已存在
                this.etcCard.getEtcDetails(param1)
                    .then(data => {
                            console.log('add etc', data);

                            //反填手机号
                            this.phone = data.toString();  //???
                            //下一步
                            this.stepNow = 2;
                        }
                    )
                    //发生异常
                    .catch(err => this.etcCard.toast(`发生异常，${err}`));
                break;
            case 2:

                //待后台接口实现，拿到etc卡相关车辆行驶证信息
                // let param2 = {
                //     ETCCardNo: this.etcCardNo
                // };
                // this.etcCard.getEtcDetails(param2)
                //     .then(data => {
                //
                //         console.log('stepNow 2', data);
                //             //改变模型数据
                //             if (data.context) {
                //                 this.etcCardDetails = {
                //                     HoldCardName: data.context.HoldCardName,
                //                     CarNum: data.context.CarNum,
                //                     CarDriveNum: data.context.CarDriveNum,
                //                     Phone: data.context.Phone
                //                 };
                //             }
                //
                //             if (data.retCode == '0000') {
                //                 this.stepNow = 3;
                //             } else {
                //                 let alert = this.alertCtrl.create({
                //                     title: '',
                //                     message: data.RetMsg ? data.RetMsg : '获取etc卡车辆相关信息失败',
                //                     buttons: ['确定']
                //                 });
                //                 alert.present();
                //             }
                //         }
                //     )
                //     .catch(this.handleError);

                this.stepNow = 3;
                break;
            case 3:
                let param3 = {
                    ClientPartyId: this.user.getUserInfo().id,
                    SupplierPartyId: this.etcType,
                    ETCCardNo: this.etcCardNo
                };
                this.etcCard.bindEtc(param3)
                    .then(() => {
                            //成功提示
                            this.etcCard.toast('添加etc成功');

                            //返回上个页面
                            this.navCtrl.pop();
                        }
                    )
                    .catch(err => this.etcCard.toast(err || '绑定失败'));
                break;
        }
    }
}

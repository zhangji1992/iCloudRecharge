import {Component, OnInit} from '@angular/core';
import {NavController, ActionSheetController, AlertController, LoadingController, Platform} from "ionic-angular";
import {AboutService} from "../../providers/aboutService";

@Component({
    selector: 'feedback',
    templateUrl: 'feedback.html'
})
export class Feedback implements OnInit {
    inputContent: string;
    picArray: any[];

    constructor(public navCtrl: NavController,
                public aboutService: AboutService,
                public actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public loadingCtrl: LoadingController) {
    }

    ngOnInit(): void {
        this.picArray = [];
    }

    addPic(): void {
        let actionSheet = this.actionSheetCtrl.create({
            cssClass: "action-sheets-basic-page",
            buttons: [{
                text: '拍照',
                role: 'destructive',
                handler: () => {
                    if (!(this.platform.is('ios') || this.platform.is('android'))) {
                        console.log('该方法只适用于移动平台');
                        return;
                    }
                    this.aboutService.getNativePic('CAMERA').then(imageData => {
                        console.log('success', imageData);
                        this.picArray.unshift({
                            imgSrc: imageData
                        });
                    }).catch(err => console.log('err', err))
                }
            }, {
                text: '从手机相册选择',
                role: 'displayed',
                handler: () => {
                    if (!(this.platform.is('ios') || this.platform.is('android'))) {
                        console.log('该方法只适用于移动平台');
                        return;
                    }
                    this.aboutService.getNativePic('PHOTOLIBRARY').then(imageData => {
                        this.picArray.unshift({
                            imgSrc: imageData
                        });
                        console.log(this.picArray);
                    }).catch(err => {
                        console.log('err', err);
                    })
                }
            }, {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
            ]
        });
        actionSheet.present();
    }

    commit(): void {
        let that = this;
        if (this.inputContent == '' || this.inputContent == undefined) {
            let alert = this.alertCtrl.create({
                title: "请输入反馈内容",
                message: '',
                buttons: ['确定']
            });
            alert.present();
            return;
        }
        let loader = this.loadingCtrl.create({
            content: "提交中..."
        });
        loader.present();

        if (this.picArray.length == 0) {
            let param = {
                'Content': this.inputContent,
                'smallPic': []
            };
            console.log("没有图片");
            this.commitService(param, loader);
        } else {
            console.log("有图片");
            this.aboutService.somePicSub(this.picArray, this.inputContent, function (obj) {
                loader.dismissAll();
                console.log(1111111, obj);
                if (obj.retCode == '0000') {
                    let alert = that.alertCtrl.create({
                        title: "反馈成功",
                        message: '',
                        buttons: [{
                            text: '确定',
                            handler: () => {
                                that.navCtrl.pop();
                            }
                        }]
                    });
                    alert.present();
                } else {
                    loader.dismissAll();
                    let alert = that.alertCtrl.create({
                        title: '提交失败',
                        message: '',
                        buttons: ['确定']
                    });
                    alert.present();
                }
            });

            /*this.aboutService.somePicSub(this.picArray).then(data =>{
             console.log(data);
             let param={
             'Content':this.inputContent,
             'smallPic':data
             };
             this.commitService(param,loader);
             }).catch(err =>{
             console.log(err);
             });*/

        }

    }

    //点击小按钮关闭图片
    closePic(index): void {
        console.log(index);
        this.picArray.splice(index, 1);
        console.log(this.picArray);
    }

    //向后台提交服务
    commitService(param, loader): void {
        this.aboutService.uploadFeedBack(param).then(data => {
            loader.dismissAll();
            console.log('commit success', data);
            let alert = this.alertCtrl.create({
                title: "反馈成功",
                message: '',
                buttons: [{
                    text: '确定',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }]
            });
            alert.present();
        }).catch(err => {
            loader.dismissAll();
            let alert = this.alertCtrl.create({
                title: err,
                message: '',
                buttons: ['确定']
            });
            alert.present();
        });
    }
}

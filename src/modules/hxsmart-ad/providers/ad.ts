import {Injectable} from '@angular/core';
import {ADURL} from "./ad-interface";
import {AdRequest} from "./ad-request";
import {Storage} from '@ionic/storage';
import {AdFileService} from "./ad-file.service";
import {Platform} from "ionic-angular";
import {Toast} from "ionic-native";


@Injectable()
export class Ad {
    public homeAdData = [];//首页要展示的所有广告数据
    public adBannerData = [];//首页滑动的广告数据
    public isLocalHomeAdData = false;//homeAdData是否从本地获取的

    private imgSrc: string;
    private layoutAdvertNum = [-1, 1, 3];//各类布局的含广告的数量，下标0表示广告banner布局，下标1表示广告一...;-1表示后台获取的所有广告，其他非负整数表示几条


    constructor(public adRequest: AdRequest,
                private storage: Storage,
                private adFile: AdFileService,
                private platform: Platform) {
        //假数据测试
        /*this.homeAdData = this.getAdHomeListMock();
         this.adBannerData = this.homeAdData && this.homeAdData[0].layoutAdvertList;
         console.log('constructor homeAdData', this.homeAdData);*/

        this.imgSrc = ADURL.imgUrl;
        this.getAdHomeList({"lastRec": "0", "number": "6"}).then(data => {
            console.log('********', data);
            if (!data) {//请求的数据为空，尝试在缓存中取
                this.getHomeAdDataFromLoacal();

                return;
            }

            this.homeAdData = JSON.parse(JSON.stringify(data.context));
            this.adBannerData = this.homeAdData && this.homeAdData[0].layoutAdvertList;
            this.isLocalHomeAdData = false;

            console.log('homeAdData', this.homeAdData);
            //this.pickImage();

            if ((this.platform.is('android') || this.platform.is('ios')) && !this.platform.is("mobileweb")) {
                let homeAdDataJSON = JSON.stringify(this.homeAdData);
                this.storage.get('homeAdData').then(res => {
                    console.log('get Storage homeAdData', res);
                    if (res != homeAdDataJSON) {//如果首页显示的广告有更新，更新本地储存的数据
                        this.adFile.cacheAdDir().then(() => {
                            this.adFile.clearAdDir()
                                .then(res => this.refreshLocalHomeAdData(homeAdDataJSON)
                                    , err => this.refreshLocalHomeAdData(homeAdDataJSON)
                                );
                        }, () => {
                            this.refreshLocalHomeAdData(homeAdDataJSON);
                        });

                    }

                }, err => {
                    console.log(err);
                    this.adFile.cacheAdDir().then(() => {
                        this.adFile.clearAdDir()
                            .then(res => this.refreshLocalHomeAdData(homeAdDataJSON)
                                , err => this.refreshLocalHomeAdData(homeAdDataJSON)
                            );
                    }, () => {
                        this.refreshLocalHomeAdData(homeAdDataJSON);
                    });
                });


            }
        }, err => {//网络异常
            this.getHomeAdDataFromLoacal();
        });


    }

    //查询广告列表
    public getList(): Promise<any[]> {
        console.log('adBannerListUrl: ', ADURL.adBannerListUrl);
        return this.adRequest.httpPost(ADURL.adBannerListUrl, {});
    }

    //查询广告详细
    public getDetail(param): Promise<any> {
        return this.adRequest.httpPost(ADURL.adDetailUrl, param)
            .then(res => res).catch(error => {
                Toast.showShortCenter("网络异常").subscribe();
                return Promise.reject(error.message || error)
            });
    }

    //查询首页要展示的所有广告列表
    public getAdHomeList(param): Promise<any> {
        return this.adRequest.httpPost(ADURL.adHomeListUrl, param);
    }

    private pickImage(): any[] {
        let arr: string[] = [];
        this.homeAdData.map(item => {
            if (item.layoutNo == '1') {
                arr = arr.concat(item.layoutAdvertList.map(i => i.advert.smallPic));
            } else {
                arr = arr.concat(item.layoutAdvertList.slice(0, this.layoutAdvertNum[+item.layoutNo - 1]).map(i => i.advert.smallPic));
            }
        });
        console.log('pick image', arr);
        return arr;
    }

    private replaceToLocalImage(fileEntries): any[] {
        let index = 0;
        let copyHomeAdData = [];
        copyHomeAdData = JSON.parse(JSON.stringify(this.homeAdData));//深复制
        copyHomeAdData.map(item => {
            console.log('replaceToLocalImage in map:', item);
            if (item.layoutNo == '1') {
                item.layoutAdvertList.map(i => i.advert.smallPic = fileEntries[index++].toURL());
            } else {
                item.layoutAdvertList.slice(0, this.layoutAdvertNum[+item.layoutNo - 1]).map(i => i.advert.smallPic = fileEntries[index++].toURL());
            }
        });
        console.log('replaceToLocalImage homeAdData', this.homeAdData);
        console.log('replaceToLocalImage copyHomeAdData', copyHomeAdData);
        return copyHomeAdData;
    }

    private refreshLocalHomeAdData(homeAdDataJSON): void {

        this.downloadAllAdImage(this.pickImage()).then(res => {
            console.log('downloadAllAdImage succ', res);
            let localHomeAdData = this.replaceToLocalImage(res);

            //保存图片到本地后的广告数据
            this.storage.set('localHomeAdData', JSON.stringify(localHomeAdData)).then(res => {
                console.log('set Storage localHomeAdData', res);

                //保存远程的原始广告数据
                this.storage.set('homeAdData', homeAdDataJSON).then(res => {
                    console.log('set Storage homeAdData', res);
                }, err => {
                    console.log(err);
                });

            }, err => {
                console.log(err);
            });
        }, err => {
            console.log('downloadAllAdImage err', err);
            this.adFile.restoreAdDir();
        }).catch(reason => {
            console.log(reason);
            this.adFile.restoreAdDir();
        });
    }

    private getHomeAdDataFromLoacal(): void {
        this.storage.get('localHomeAdData').then(res => {
            console.log('get Storage localHomeAdData', res);

            this.homeAdData = JSON.parse(res);
            this.adBannerData = this.homeAdData && this.homeAdData[0].layoutAdvertList;
            this.isLocalHomeAdData = true;
        }, err => {
            console.log(err);
        });
    }

    private downloadAllAdImage(arr): Promise<any> {
        let promises: any = arr.map(item => this.adFile.downloadImage(this.imgSrc + item));
        return Promise.all(promises);
    }

}

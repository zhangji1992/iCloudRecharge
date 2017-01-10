import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Camera, Transfer, AppVersion, FileUploadResult} from 'ionic-native';
import {Platform} from "ionic-angular";
import {interfaceUrl} from '../../../providers/serverUrl';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AboutService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
                private platform: Platform) {
    }

    /**
     * 意见反馈
     * @param param
     * @returns {Promise<TResult|T>}
     */
    public uploadFeedBack(param): Promise<any> {
        //todo
        return this.http
            .post(interfaceUrl.feedbackUrl, JSON.stringify(param), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    /**
     * 查询最新版本信息
     * @param data
     * @returns {Promise<any>}
     */
    public getLatestVer(data: string): Promise<any> {
        let param = {
            "platformType": data
        };
        return this.http
            .post(interfaceUrl.getLatestVerUrl, param, {headers: this.headers})
            .toPromise()
            .then(res => res.json().context.versionNo)
            .catch(this.handleError);
    }

    /**
     * 查询当前版本信息
     * @returns {Promise<any>}
     */
    public getCurrentVer(): Promise<any> {
        return AppVersion.getVersionNumber();
    }

    /**
     * 错误回调
     * @param error
     * @returns {Promise<never>}
     */
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    /**
     * 拍照或选择本地图片
     * @param getType
     * @returns {Promise<[TResult]|T>}
     */
    public getNativePic(getType = 'CAMERA'): Promise<any> {
        if (!(this.platform.is('android') || this.platform.is('ios'))) {
            console.log('该方法只是用于移动平台');
            return;
        }
        let options = {
            quality: 85,
            sourceType: Camera.PictureSourceType[getType],
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            targetWidth: 50,
            targetHeight: 50,
            correctOrientation: true
        };
        return Camera.getPicture(options)
            .then(imageData => imageData)
            .catch(this.handleError);
    }

    /**
     * 提交反馈内容
     * @param picArray
     * @param inputContent 意见反馈文本
     * @param fun
     */
    public somePicSub(picArray, inputContent, fun) {
        let that = this;
        let submitArray = [];

        function request(index) {
            console.log(index);
            let options = {fileKey: "", fileName: ""};
            options.fileKey = "file";
            options.fileName = picArray[index].imgSrc.substr(picArray[index].imgSrc.lastIndexOf('/') + 1);
            let ft = new Transfer();


            console.log('option', options);
            ft.upload(picArray[index].imgSrc, encodeURI(interfaceUrl.UploadTempFile), options)
                .then((data: FileUploadResult) => {
                    console.log('success', data);
                    submitArray.push(JSON.parse(data.response).context[options.fileName]);
                    console.log('i am array', submitArray);
                    if (index == picArray.length - 1) {
                        let param = {
                            'Content': inputContent,        //意见文本
                            'smallPic': submitArray         //（单张图片时）后台返回的图片路径，（多张图片时）图片路径数组
                        };
                        that.uploadFeedBack(param).then(function (obj) {
                            console.log('obj', obj);
                            fun(obj);
                        }, function () {
                        });
                    } else {
                        request(index + 1);
                    }
                }, (err) => {
                    return err;
                });
        }

        request(0);
    }
}


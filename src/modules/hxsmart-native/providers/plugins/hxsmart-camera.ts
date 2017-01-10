import {Injectable} from '@angular/core';
import {Camera} from 'ionic-native';
import {Platform} from 'ionic-angular';

declare var cordova: any;

@Injectable()
export class HxsmartCamera {
    public platform: any;


    constructor(platform: Platform) {
        this.platform = platform;
    }

    /**
     * 按ios和android平台获取对应路径
     * @returns {string}
     */
    private getSaveDir(): string {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            console.warn('该方法只用于移动平台');
            return "";
        }
        return this.platform.is('android') ? cordova.file.dataDirectory : cordova.file.documentsDirectory;
    }

    /**
     * 拍照或者从相册选择照片，并保存到指定目录(图片默认大小为屏幕高度*屏幕宽度)
     * @function getPictureAndSave
     * @param saveDir {string} 图片保存路径,必填
     * @param sourceType ｛number｝ 0，拍照；1，从相册选择，选填，默认为拍照
     * @param width ｛number｝照片宽度，选填 默认为屏幕宽度
     * @param height ｛number｝ 照片高度，选填 默认为屏幕高度
     * @returns {Promise<T>} 图片保存的路径，包括扩展名
     */
    private getPicturePath(saveDir: string, sourceType?: number, width?: number, height?: number): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        if (typeof sourceType == "undefined") {
            sourceType = 0;
        }
        let options = null;
        if (sourceType == 0) {//相册
            options = {
                destinationType: 1,
                encodingType: 0,
                sourceType: sourceType,
                allowEdit: false
            }
        }
        if (sourceType == 1) {//拍照
            options = {
                quality: 80,
                destinationType: 1,
                sourceType: sourceType,
                allowEdit: false,
                encodingType: 0,
                targetWidth: width,
                targetHeight: height,
                saveToPhotoAlbum: false,
                correctOrientation: true
            }
        }
        let promise = new Promise(function (resolve, reject) {
            Camera.getPicture(options).then(
                (res1) => {
                    console.log(res1, "调用插件成功");
                    resolve(res1);
                    /*let fileName = new Date().getTime() + ".dat";
                     let dir = saveDir + fileName;
                     File.writeFile(
                     saveDir,//保存路径
                     fileName,//文件名
                     "data:image/jpg;base64," + res1, //文件内容
                     true
                     ).then(() => {
                     console.log('写文件成功');
                     resolve(dir);
                     }, (err2)=> {
                     console.log(err2, '写文件失败');
                     reject(err2);
                     });*/
                },
                (err) => {
                    console.log(err, '失败');
                    reject(err);
                }
            );
        });
        return promise;
    }

    /**
     * 拍照
     * @param saveDir {string} 保存路径，选填
     * @param width {number} 照片宽度，选填
     * @param height {number} 照片高度，选填
     * @returns {Promise<T>|Promise}
     */
    public takePhoto(saveDir?: string, width?: number, height?: number): Promise<any> {
        saveDir = saveDir || this.getSaveDir();
        width = width || screen.width;
        height = height || screen.height;
        return this.getPicturePath(saveDir, 0, width, height);

    }

    /**
     * 从相册选择图片
     * @param saveDir {string} 保存图片的目标路径，选填
     * @returns {Promise<T>|Promise}
     */
    public selectPhoto(saveDir?: string): Promise<any> {
        saveDir = saveDir || this.getSaveDir();
        return this.getPicturePath(saveDir, 1);
    }


}

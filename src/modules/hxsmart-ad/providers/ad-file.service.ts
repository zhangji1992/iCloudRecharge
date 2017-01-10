/**
 * Created by Jimmy Luo  on 2016/11/30.
 */
import {Injectable} from '@angular/core';
import {File, Transfer} from 'ionic-native';

declare var cordova: any;


@Injectable()
export class AdFileService {
    private adDir = 'ad/images';//广告图片存放的路径
    private tempAdDir = 'ad/tempImages';//广告图片存放的临时路径
    private trustHosts = true;//cordovaFileTransfer.download参数
    private options = {};//cordovaFileTransfer.download参数
    constructor() {

        /* File.getFreeDiskSpace().then(() => {
         File.checkDir(cordova.file.dataDirectory, this.adDir).then(()=> {
         File.createDir(cordova.file.dataDirectory, this.adDir, false).then((res)=> {
         console.log(res);
         }, err => console.log(err));
         }, err =>{

         console.log(err);
         });
         }, err => console.log(err));*/

    }

    /**
     * 暂存广告数据文件夹
     * @returns {Promise<TResult>}
     */
    public cacheAdDir(): Promise<any> {
        return File.removeRecursively(cordova.file.dataDirectory, this.tempAdDir).then(() => {
            return File.copyDir(cordova.file.dataDirectory, this.adDir, cordova.file.dataDirectory, this.tempAdDir)
                .then(res => console.log(res)).catch(err => console.error(err));
        }, err => {
            console.log(err);
            return File.copyDir(cordova.file.dataDirectory, this.adDir, cordova.file.dataDirectory, this.tempAdDir)
                .then(res => console.log(res)).catch(err => console.error(err));
        });
    }

    /**
     * 把暂存的广告文件夹恢复
     * @returns {Promise<TResult>}
     */
    public restoreAdDir(): Promise<any> {
        return this.clearAdDir().then(() => {
            return File.copyDir(cordova.file.dataDirectory, this.tempAdDir, cordova.file.dataDirectory, this.adDir)
                .then(res => {
                    console.log(res);
                    File.removeRecursively(cordova.file.dataDirectory, this.tempAdDir);
                })
                .catch(err => console.error(err));
        }, err => {
            console.log(err);
            return File.copyDir(cordova.file.dataDirectory, this.tempAdDir, cordova.file.dataDirectory, this.adDir)
                .then(res => {
                    console.log(res);
                    File.removeRecursively(cordova.file.dataDirectory, this.tempAdDir);
                })
                .catch(err => console.error(err));
        });
    }

    /**
     * 把广告文件夹清空
     */
    public clearAdDir(): Promise<any> {
        return File.removeRecursively(cordova.file.dataDirectory, this.adDir)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    public downloadImage(url): Promise<any> {
        let transfer = new Transfer();
        let date = new Date();
        let timeLine = `${date.getFullYear()}${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
        let targetPath = `${cordova.file.dataDirectory}${this.adDir}/${timeLine}.png`;//保存图片的路径
        console.log('targetPath', targetPath);
        return transfer.download(url, targetPath, this.trustHosts, this.options)
            .then(res => {
                console.log(res);
                return res;
            }, err => {
                console.log(err);
            });
    }


}

/**
 * Created by Jimmy Luo  on 2016/12/26.
 */
import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {Http} from "@angular/http";
import {AppVersion} from "ionic-native";

@Injectable()
export class AppUpdateService {
    private _apkName = 'com.snda.wifilocating';
    private _androidAppId = '100733732';//本应用在应用宝平台的app id
    private _pcAndroidMktUrl = `http://sj.qq.com/myapp/detail.htm?apkName=${this._apkName}`;//本应用在应用宝PC页面的地址
    private _iosAppUrl;

    public mobileAndroidMktUrl = `http://app.qq.com/#id=detail&appid=${this._androidAppId}`;//本应用在应用宝mobile页面的地址

    public latestAppDetail: any;//{latestVersion: '1.0.0', changeLog: '跟新的内容'}

    constructor(private platform: Platform,
                private http: Http) {
        console.log(platform.platforms());
    }

    /**
     *
     * @param currentVersion app当前版本 比如0.0.1
     * @returns {boolean} true表示有更新
     */
    public checkUpdate(currentVersion: string): Promise<any> {
        console.log('version', AppVersion.getVersionNumber());
        return this._getLatestApp().then(res => {
            console.log(res);
            this.latestAppDetail = this._parseAppDetail(res._body);
            return this.latestAppDetail.latestVersion > currentVersion;
        });
    }


    private _getLatestApp(): Promise<any> {
        let url = (this.platform.is('ios') && this._iosAppUrl) || (this.platform.is('android') && this._pcAndroidMktUrl);
        console.log('url', url);
        return this.http.get(url)
            .toPromise()
            .then(res => res)
            .catch(this._handleError);
    }

    //错误回调
    private _handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     * 解析页面，获取最新版本号和更新内容
     * @param html 当前应用在应用宝的html页面
     * @private
     */
    private _parseAppDetail(html): any {
        let result = {latestVersion: '', changeLog: ''};
        let keyWord1 = 'det-othinfo-data';
        let keyWord2 = 'det-app-data-info';
        let index1 = html.indexOf(keyWord1);
        let index2 = html.lastIndexOf(keyWord2);
        result.latestVersion = html.substring(index1 + keyWord1.length + 3, html.indexOf('</', index1));
        result.changeLog = html.substring(index2 + keyWord2.length + 2, html.indexOf('</div>', index2));

        console.log('parseHtml', result);
        return result;
    }

}

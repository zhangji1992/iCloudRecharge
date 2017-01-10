/**
 * Created by Jimmy Luo  on 2016/12/13.
 */
import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class OcrCardRequestService {
    private _baseUrl = [
        'https://dm-52.data.aliyun.com/rest/160601/ocr/',
        'https://dm-53.data.aliyun.com/rest/160601/ocr/',
        'https://dm-51.data.aliyun.com/rest/160601/ocr/',
        'https://dm-58.data.aliyun.com/rest/160601/ocr/',
    ];
    private _urlName = ['ocr_driver_license.json', 'ocr_vehicle.json', 'ocr_idcard.json', 'ocr_business_license.json'];

    public ocrDriverLicenseUrl = `${this._baseUrl[0]}${this._urlName[0]}`;
    public ocrVehicleUrl = `${this._baseUrl[1]}${this._urlName[1]}`;
    public ocrIdCardUrl = `${this._baseUrl[2]}${this._urlName[2]}`;
    public ocrBusinessLicenseUrl = `${this._baseUrl[3]}${this._urlName[3]}`;

    private _headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'APPCODE 65fa05ba90524fd4b162f2ed06264388'
    });

    constructor(private http: Http) {
    }

    public httpPost(url, param): Promise<any> {
        console.log('param', param);
        console.log('headers', this._headers);
        return this.http.post(url, param, {headers: this._headers})
            .toPromise()
            .then(response => {
                console.log('ocr返回数据', response);
                return response;
            })
            .catch(this.handleError);
    }


    //错误回调
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}

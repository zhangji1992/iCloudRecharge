import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EtcCardRequest {
    private headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

    /**
     * 错误回调
     * @param error
     * @returns {Promise<never>}
     */
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    constructor(public http: Http) {
    }

    postMethod(url: string, param: any): Promise<any> {
        return this.http
            .post(url, JSON.stringify(param), {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}

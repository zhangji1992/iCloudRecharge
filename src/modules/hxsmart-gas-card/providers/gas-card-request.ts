import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GasCardRequest {

    constructor(public http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

    postMethod(url: any, param: any): Promise<any> {
        let data = param;
        if (typeof data != "string") {
            data = JSON.stringify(data)
        }
        return this.http
            .post(url, data, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

}

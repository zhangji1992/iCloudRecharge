import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "../../hxsmart-user/providers/user";
import {interfaceUrl} from "../../../providers/serverUrl";

@Injectable()
export class MyMessagesService {
    private storageNum: number = 100;            //缓存个数
    private _unreadNum: number = 0;             //未读消息总数
    private _storageMessages: any[] = [];       //缓存消息
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
                private user: User) {
    }

    //未读消息总数
    get unreadNum() {
        return this._unreadNum;
    }

    //缓存消息
    get storageMessages() {
        return this._storageMessages;
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
     * 向后台发送http请求
     * @param url
     * @param param
     * @returns {Promise<TResult|T>}
     */
    private postRequest(url: string, param: any): Promise<any> {
        return this.http
            .post(url, JSON.stringify(param), {headers: this.headers})
            .toPromise()
            .then(res => res.json().context)
            .catch(this.handleError);
    }

    /**
     * 获取未读消息个数
     * @returns {Promise<TResult|TResult>}
     */
    public getUnreadNum(): Promise<any> {
        let param = {
            partyId: this.user.getUserInfo().id
        };
        console.log('param', interfaceUrl.MessageNumUrl, param);
        return this.postRequest(interfaceUrl.MessageNumUrl, param)
            .then(res => {
                console.log('未读消息个数', res.content);
                this._unreadNum = Number(res.content);
            })
            .catch(this.handleError);
    }

    /**
     * /下拉刷新
     * @returns {Promise<TResult|any[]>}
     */
    public doRefresh(): Promise<any> {
        let param = {
            partyId: this.user.getUserInfo().id
        };
        return this.postRequest(interfaceUrl.myMessageUrl, param)
            .then(resArr => {
                console.log('未读消息', resArr);

                //更新视图
                this._unreadNum = 0;
                if (resArr.length >= this.storageNum) {
                    this._storageMessages = resArr.slice(0, this.storageNum);
                } else {
                    let storage = JSON.parse(localStorage.getItem(`unreadMessagesOf${param.partyId}`));
                    this._storageMessages = storage ? resArr.concat(storage).slice(0, this.storageNum) : resArr;
                }

                //更新缓存
                localStorage.removeItem(`unreadMessagesOf${param.partyId}`);
                localStorage.setItem(`unreadMessagesOf${param.partyId}`, JSON.stringify(this._storageMessages));
            })
            .catch(this.handleError);
    }

    public clear() {
        //更新视图
        this._storageMessages = [];

        //删除缓存
        localStorage.removeItem(`unreadMessagesOf${this.user.getUserInfo().id}`);
    }
}

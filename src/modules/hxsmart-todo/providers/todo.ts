import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {TodoInterface} from "./todo-interface";
@Injectable()
export class Todo {
    private headers = new Headers({"Content-type": "application/app"});

    constructor(public http: Http,) {
    }

    num: null

    todoObject = {
        showNum: false,
        num: null,
        showPayPwd: false,
        payPwdTime: "",
        showBindEmail: false,   //是否显示绑定邮箱
        bindEmailTime: "",      //绑定邮箱时间
        showGasCard: false,     //显示燃气卡
        gasCardList: [],
        showWriteGasCard: false,   //显示燃气卡写卡失败
        writeGasCardList: [],
        showSchoolCard: false,  //显示校园卡
        schoolCardList: [],
        showWriteSchoolCard: false,    //显示校园卡失败
        writeSchoolCardList: [],
        showETCCard: false,     //显示ETC卡写卡
        ETCCardList: [],
        showWriteETCCard: false, //显示ETC卡写卡失败
        writeETCCardList: []
    };

    /**
     *
     * @returns {Promise<T>}
     */
    public getTodoContent(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getTodoRequest(TodoInterface.getTodoContent).then(
                res => {
                    console.log("获取待办事项123:", res);
                    for (let index of res.context) {
                        /**
                         * 待办事项:
                         * 1:校园充值卡待写卡;2:未设置支付密码;3:未绑定邮箱;4:燃气卡充值待写卡;
                         * 5:校园卡写卡失败;6:燃气卡写卡失败;7.ETC充值待写卡;8:ETC写卡失败
                         */
                        if (index.todoType == 1) {
                            this.todoObject.showSchoolCard = true;
                            this.todoObject.schoolCardList.push(index);
                        } else if (index.todoType == 2) {
                            this.todoObject.showPayPwd = true;
                            this.todoObject.payPwdTime = index.noteDate;
                        } else if (index.todoType == 3) {
                            this.todoObject.showBindEmail = true;
                            this.todoObject.bindEmailTime = index.noteDate;
                        } else if (index.todoType == 4) {
                            this.todoObject.showGasCard = true;
                            this.todoObject.gasCardList.push(index);
                        } else if (index.todoType == 5) {
                            this.todoObject.showWriteSchoolCard = true;
                            this.todoObject.writeSchoolCardList.push(index);
                        } else if (index.todoType == 6) {
                            this.todoObject.showWriteGasCard = true;
                            this.todoObject.writeGasCardList.push(index)
                        } else if (index.todoType == 7) {
                            this.todoObject.showETCCard = true;
                            this.todoObject.ETCCardList.push(index);
                        } else if (index.todoType == 8) {
                            this.todoObject.showWriteETCCard = true;
                            this.todoObject.writeETCCardList.push(index);
                        }
                    }
                },
                err => {
                    console.log(err);
                    if (err.retCode == "ErrorSignToken") {
                        reject("用户登录信息无效,请退出后重新登录!")
                    } else {
                        reject(err)
                    }
                }
            );
        });
    }

    public getTodoNum(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getTodoRequest(TodoInterface.getTodoSize).then(
                res => {
                    let num = res.context.total;
                    if (num == 0) {
                        this.todoObject.showNum = false;
                    } else {
                        this.todoObject.num = num;
                        this.todoObject.showNum = true;
                    }
                    resolve(num);
                },
                err => {
                    console.log(err);
                    if (err.retCode == "ErrorSignToken") {
                        reject("用户登录信息无效,请退出后重新登录!")
                    } else {
                        reject(err)
                    }
                }
            );
        });
    }

    private getTodoRequest(url: any, param?: any): Promise<any> {
        let data = param || {};
        console.info("请求地址:", url, "参数:", data);
        return new Promise((resolve, reject) => {
            this.http.post(url, data, {headers: this.headers})
                .toPromise()
                .then(
                    suc => {
                        console.log(suc);
                        let res = suc.json();
                        res.retCode == "0000" ? resolve(res) : reject(res);
                    }, err => {
                        reject(err);
                    });
        });
    }
}

import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {DBConfig} from './dbConfig';

declare var sqlitePlugin: any;

@Injectable()
export class HxsmartSqlite {
    private platform: any;
    private db: any;//数据库对象
    private dbName: string = DBConfig.dbName;//本地数据库名 例如，cloud.db
    private dbFlag: string = DBConfig.dbFlag;//标识名称，是否创建数据库成功cloud
    private dbTable: Array<any> = DBConfig.dbTable;//数据库建表语句,['CREATE TABLE  user (id INTEGER PRIMARY KEY,msg TEXT)']

    constructor(platform: Platform) {
        this.platform = platform;
    }

    /**
     * 创建数据库
     * @param config {object} {dbName:"",dbFlag:"",dbField:"",dbTable:""}
     * @param table
     * @returns {Promise}
     */
    public createDB(config: any): Promise<any> {
        if (!this.platform.is('ios') && !this.platform.is('android') || this.platform.is("mobileweb")) {
            return new Promise(function (resolve, reject) {
                reject('该方法只用于移动平台');
            });
        }
        let promise = null;
        if (localStorage[this.dbFlag] == undefined || !localStorage[this.dbFlag]) {//数据库没有创建
            promise = new Promise((resolve, reject) => {
                this.createDbAndTable().then(() => {
                    localStorage[this.dbFlag] = true;
                    console.log("数据库创建成功");
                    resolve(this.db);
                }, (err) => {
                    localStorage[this.dbFlag] = false;
                    console.log("数据库创建失败", err);
                    reject(err);
                })
            });

        } else {//打开数据库
            promise = this.openDB({name: this.dbName, location: 0})
        }
        return promise;
    }

    /**
     *打开或者创建数据库
     */
    private openDB(option: any): Promise<any> {
        return new Promise((resolve, reject) => {
            sqlitePlugin.openDatabase(option, (res) => {
                this.db = res;
                resolve(res);
            }, reject);
        });
    }

    /**
     * 创建数据库并且建表
     * @returns {Promise}
     */
    private createDbAndTable(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.openDB({name: this.dbName, location: 0})
                .then(() => {
                    this.db.sqlBatch(this.dbTable, resolve, reject);
                }, (err) => {
                    reject(err);
                });
        })
    }

}

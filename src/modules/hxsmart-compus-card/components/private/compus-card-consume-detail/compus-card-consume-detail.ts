import {Component, OnInit}           from '@angular/core';
import {CompusCard}                 from '../../../providers/compus-card';
import {Refresher, InfiniteScroll, NavParams}                from 'ionic-angular';

@Component({
    selector: 'compus-card-consume-detail',
    templateUrl: 'compus-card-consume-detail.html'
})
export class CompusCardConsumeDetail implements OnInit {

    pageIndex: number;

    constructor(public compusCard: CompusCard,
                private navParams: NavParams) {
    }

    ngOnInit(): void {
        console.log('i am navParams', this.navParams);
        let endData = this.getNowFormatDate();
        let startData = '2015-01-01 11:12:23';
        this.compusCard.compusConsumeList(this.navParams.data, 0, startData, endData);
        this.pageIndex = 0;
    }

    //下拉刷新列表
    doRefresh(refresh: Refresher) {
        this.pageIndex = 0;
        let endData = this.getNowFormatDate();
        let startData = '2015-01-01 11:12:23';
        this.compusCard.compusConsumeList(this.navParams.data, 0, startData, endData);
        refresh.complete(); //刷新完成
    }

    //上拉加载更多
    doInfinite(infiniteScroll: InfiniteScroll) {
        this.pageIndex = this.pageIndex + 1;
        console.info('load more');
        let endData = this.getNowFormatDate();
        let startData = '2015-01-01 11:12:23';
        this.compusCard.compusConsumeList(this.navParams.data, this.pageIndex, startData, endData);
        infiniteScroll.complete();  //
    }

    //获取系统当前时间,返回格式为格式“yyyy-MM-dd HH:MM:SS”;
    getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let monthNew: string;
        let strDateNew: string;
        if (month >= 1 && month <= 9) {
            monthNew = "0" + month.toString();
        } else {
            monthNew = month.toString();
        }
        if (strDate >= 0 && strDate <= 9) {
            strDateNew = "0" + strDate.toString();
        } else {
            strDateNew = strDate.toString();
        }
        let currentdate = date.getFullYear() + seperator1 + monthNew + seperator1 + strDateNew
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
}

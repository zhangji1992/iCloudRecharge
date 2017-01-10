import {Component, OnInit} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Shortcut} from "../../../providers/shortcut";

@Component({
    selector: 'shortcut-detail',
    templateUrl: 'shortcut-detail.html'
})
export class ShortcutDetail implements OnInit {
    //后台数据副本
    shortcutsCopy: any[] = [];

    constructor(public viewCtrl: ViewController,
                public shortcut: Shortcut,) {
    }

    ngOnInit() {
        this.shortcut.getList('shortcut');


        // //取后台数据
        // let shortcutsDetail = JSON.parse(localStorage.getItem('shortcut')).data;
        //
        // for (let i = 0; i < shortcutsDetail.length; i++) {
        //     this.shortcutsCopy.push(shortcutsDetail[i]);
        // }
    }

    /////////////////////////////////////////////////////
    /*返回+完成两个按钮时*/

    //取消按钮
    // dismiss() {
    //   //取消模态框
    //   this.viewCtrl.dismiss();
    // }

    //完成按钮
    // manage() {
    //     //重新设置缓存
    //     localStorage.removeItem('shortcut');
    //
    //     //格式化后存入缓存
    //     let afterObj = {
    //         'data': this.shortcutsCopy,
    //         'time': this.shortcut.shortcuts.time
    //     };
    //     localStorage.setItem('shortcut', JSON.stringify(afterObj));
    //     this.shortcut.getList('shortcut');
    //
    //     //取消模态框
    //     this.viewCtrl.dismiss();
    // }
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    /*返回一个按钮时*/

    //完成按钮
    manage() {


        let _items = [];
        for (let item of this.shortcut.shortcutsDetail) {
            if (item.isShow == true) {
                _items.push(item);
            }
        }

        //存入新缓存
        let afterObj = {
            data: _items,
            time: this.shortcut.shortcuts.time
        };

        //更新缓存
        localStorage.removeItem('shortcut');
        localStorage.setItem('shortcut', JSON.stringify(afterObj));

        //刷新页面数据
        this.shortcut.getList('shortcut');

        //取消模态框
        this.viewCtrl.dismiss();
    }

    /////////////////////////////////////////////////////

    toggle(index: number) {
        this.shortcut.shortcutsDetail[index].isShow = !this.shortcut.shortcutsDetail[index].isShow;
    }
}

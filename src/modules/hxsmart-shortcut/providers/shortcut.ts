import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class Shortcut {
    constructor() {
    };

    shortcuts = {
        data: [
            {id: 1, icon: "flame", txt: "我的校园卡", color: "#FFA64A", redirect: 'CompusCardList', isShow: false},
            {id: 2, icon: "heart", txt: "我的燃气卡", color: "#FF82A5", redirect: 'GasCardList', isShow: true},
            {id: 3, icon: "car", txt: "我的支付账户", color: "#9469DE", redirect: 'PayAccountList', isShow: false},
            {id: 4, icon: "school", txt: "添加校园卡", color: "#84CF08", redirect: 'CompusCardAddComponent', isShow: false},
            {id: 5, icon: "calendar", txt: "添加燃气卡", color: "#2E6EFF", redirect: 'GasCardAdd', isShow: true},
            {id: 6, icon: "color-palette", txt: "意见反馈", color: "#456789", redirect: 'Feedback', isShow: true},
            // {id: 7, icon: "closed-captioning", txt: "缴费", color: "#AA4BC5", redirect: 'Feedback', isShow: true},
            // {id: 9, icon: "flame", txt: "最新消息", color: "#FFA64A", href: "0", isShow: false},
            // {id: 10, icon: "heart", txt: "学生请假", color: "#FF82A5", href: "0", isShow: false},
            // {id: 11, icon: "car", txt: "联系老师", color: "#9469DE", href: "0", isShow: false},
            // {id: 12, icon: "school", txt: "教育", color: "#84CF08", href: "0", isShow: false},
            // {id: 13, icon: "color-palette", txt: "生活", color: "#456789", href: "0", isShow: false},
            // {id: 14, icon: "phone-portrait", txt: "学校风采", color: "#EF654A", href: "0", isShow: false},
            // {id: 15, icon: "calendar", txt: "今日考勤", color: "#2E6EFF", href: "0", isShow: false},
            // {id: 16, icon: "closed-captioning", txt: "缴费", color: "#AA4BC5", href: "0", isShow: false},
            // {id: 17, icon: "flame", txt: "最新消息", color: "#FFA64A", href: "0", isShow: false},
            // {id: 18, icon: "heart", txt: "学生请假", color: "#FF82A5", href: "0", isShow: false},
        ],
        time: '2016.12.29'
    };

    //页面快捷方式数组,数组内每个元素为：含6个快捷方式的数组
    items: any[] = [];
    //快捷方式
    shortcutsDetail: any[] = [];

    /**
     * 格式化数据（私有）
     * @param {array} shortcuts
     * @returns {array}
     */
    format(shortcuts: any[]): any[] {
        let shortcutsArr = [];

        if (shortcuts.length) {
            for (let i = 0; i < shortcuts.length; i++) {
                if (shortcuts[i].isShow == true) {
                    shortcutsArr.push(shortcuts[i]);
                }
            }


            let temp = [];
            //遍历数据源
            let slideNum = shortcutsArr.length / 9;
            for (let i = 0; i < slideNum; i++) {
                temp.push(shortcutsArr.slice(9 * i, 9 * (i + 1)));
            }

            return temp;
        }

        return shortcutsArr;
    }

    /**
     * 列表初始化
     * @param {string} key
     */
    getList(key: string) {
        let temp = JSON.parse(localStorage.getItem(key));
        if (temp) {

            if (this.shortcuts.time == temp.time) {

                this.items = this.format(temp.data);
                this.shortcutsDetail = this.shortcuts.data;
            } else {

                console.log('temp', temp);
                //遍历数据，最后的数据为：用户改变后的缓存+硬数据

                // for (let a of this.shortcuts.data) {
                //     for (let b of temp.data) {
                //         if (a.id == b.id) {
                //             b.isShow = a.isShow == true
                //         }
                //     }
                // }

                localStorage.removeItem('shortcut');

                let _shortcut = [];
                for (let item of this.shortcuts.data) {
                    if (item.isShow == true) {
                        _shortcut.push(item);
                    }
                }

                let _shortcutStorage = {
                    data: _shortcut,
                    time: this.shortcuts.time
                };

                //设置缓存
                localStorage.setItem(key, JSON.stringify(_shortcutStorage));

                this.items = this.format(_shortcut);
                this.shortcutsDetail = this.shortcuts.data;
            }
        } else {

            let _shortcut = [];
            for (let item of this.shortcuts.data) {
                if (item.isShow == true) {
                    _shortcut.push(item);
                }
            }

            let _shortcutStorage = {
                data: _shortcut,
                time: this.shortcuts.time
            };

            //设置缓存
            localStorage.setItem(key, JSON.stringify(_shortcutStorage));


            this.items = this.format(_shortcut);
            this.shortcutsDetail = this.shortcuts.data;
        }
    }
}

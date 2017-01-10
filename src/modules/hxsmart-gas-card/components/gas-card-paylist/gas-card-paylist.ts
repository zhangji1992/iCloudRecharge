import {Component} from '@angular/core';
import {GasCard}     from '../../providers/gas-card';

@Component({
    selector: 'gas-card-paylist',
    templateUrl: 'gas-card-paylist.html'
})
export class GasCardPaylist {
    payList: any = [];//支付账户列表
    payMethod: any = [];//支付渠道列表
    payMethodName: string;//所有支付渠道名称
    payDefault: string;//默认渠道代码
    showBol: boolean = false;
    showIndex: number = 1;

    constructor(public gasCard: GasCard) {
        let self = this;
        self.gasCard.gasPayWay(function (data) {
            console.log(data);
            self.payMethod = data;
            self.setPayDefault(data);
            self.payMethodName = self.setPayMethodName(data);
            self.gasCard.getAccountInfo(function (data) {
                console.log(data.context);
                if (data.context.length == 0) {
                    self.gasCard.showAlert('提示', '未查询到任何支付账户，如需充值，请先绑定以下任一支付方式：' + self.payMethodName, ['确定'])
                } else {
                    self.payList = self.defaultArr(self.setDefault(self.setRate(data.context, self.payMethod)));
                    console.log(1111, self.payList);
                    self.gasCard.setGasPayMethod(self.payList[0]);
                }
            });
        });

    }

    showList() {
        let self = this;
        self.showBol = !self.showBol;
        self.payList = self.defaultArr(self.payList);
        if (self.showIndex == 1) {
            self.showIndex = self.payList.length;
        } else {
            self.showIndex = 1;
        }
    }

    setPayDefault(arr) {
        let self = this;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].IsDefault) {
                self.payDefault = arr[i].payChannelCode;
            }
        }
    }

    setPayMethodName(arr) {
        let str = arr[0].accountTypeName;
        for (let i = 1; i < arr.length; i++) {
            str = str + ',' + arr[i].accountTypeName;
        }
        return str;
    }

    setRate(arr, arr2) {//设置费率并添加默认支付字段且设置为非默认支付
        for (let i = 0; i < arr.length; i++) {
            arr[i].IsDefault = 0;
            for (let j = 0; j < arr2.length; j++) {
                if (arr[i].payChannelCode == arr2[j].payChannelCode) {
                    if (arr2[j].ModulePayRate.length != 0) {
                        arr[i].rate = arr2[j].ModulePayRate[0].feeRedix;
                    } else {
                        arr[i].rate = 0;
                    }
                }
            }
        }
        return arr;
    };

    setDefault(arr) {
        let def = this.payDefault;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].payChannelCode == def) {
                arr[i].IsDefault = 1;
                console.log(arr);
                return arr;
            }
        }
        return arr;
    }

    defaultArr(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].IsDefault == 1) {
                total++;
                arr.unshift(arr[i]);
                arr.splice(i + 1, 1);
            }
        }
        if (total == 0) {
            arr[0].IsDefault = 1;
        }
        return arr;
    };

    selectWay(index) {
        let self = this;
        console.log(index);
        for (let i = 0; i < self.payList.length; i++) {
            self.payList[i].IsDefault = 0;
        }
        self.payList[index].IsDefault = 1;
        self.gasCard.setGasPayMethod(self.payList[index]);
    }
}

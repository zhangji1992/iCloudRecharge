import {Component, OnInit} from '@angular/core';
import {EtcCard} from "../../providers/etc-card";
import {User} from "../../../hxsmart-user/providers/user";

@Component({
    selector: 'etc-card-recharge-pay-channel-list',
    templateUrl: 'etc-card-recharge-pay-channel-list.html'
})
export class EtcRechargePayChannelListComponent implements OnInit {
    payChannelList: any[] = [];

    constructor(private etcCard: EtcCard,
                private user: User) {
    }

    ngOnInit() {
        let loader = this.etcCard.loading('加载中...');
        let param = {
            partyId: this.user.getUserInfo().id,
            ModuleCode: 'Campus'
        };
        this.etcCard.getPayChannelList(param)
            .then(data => {
                console.log('get data', data);

                //检验有无支付账户
                if (data.length == 0) {
                    this.etcCard.toast('请先开通支付账户后再充值');
                    this.payChannelList = [];
                } else {
                    this.payChannelList = data;
                }

                loader.dismiss();
            })
            .catch(err => {
                loader.dismiss();
                this.etcCard.toast(`发生错误, ${err}`);
            });
    }

    selectWay(index: any) {
        console.log('index', index);
        for (let i = 0; i < this.etcCard.payChannelList.length; i++) {
            this.etcCard.payChannelList[i].IsDefault = 0;
        }
        this.etcCard.payChannelList[index].IsDefault = 1;

        this.etcCard.rechargeAccount = {
            payChannelCode: this.etcCard.payChannelList[index].payChannelCode,           //确定付款渠道
            payAccountId: this.etcCard.payChannelList[index].accountId,                  //确定付款账户id
            accountTypeName: this.etcCard.payChannelList[index].accountTypeName,         //确定付款账户名称
            feeRedix: this.etcCard.payChannelList[index].feeRedix                        //确定付款账户费率
        };
    }
}

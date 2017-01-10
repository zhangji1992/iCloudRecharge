import {Component, OnInit} from '@angular/core';
import {EtcCard} from "../../providers/etc-card";
import {NavParams, Refresher, InfiniteScroll} from "ionic-angular";
import {User} from "../../../hxsmart-user/providers/user";

@Component({
    selector: 'etc-card-recharge-record',
    templateUrl: 'etc-card-recharge-record.html'
})
export class EtcCardRechargeRecordComponent implements OnInit {
    pageIndex: number = 0;//当前页
    pageSize: number = 10;//每页数据个数

    constructor(private etcCard: EtcCard,
                private navParams: NavParams,
                private user: User) {
    }

    ngOnInit() {
        let params1 = {
            partyId: this.user.getUserInfo().id,
            SupplierClientId: this.navParams.get('SupplierClientId'),
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
        };
        this.etcCard.getEtcRechargeDetails(params1)
        //发生异常
            .catch(err => this.etcCard.toast(`发生异常${err}`));
    }

    //下拉刷新列表
    doRefresh(refresher: Refresher) {
        this.pageIndex = 0;

        let params2 = {
            partyId: this.user.getUserInfo().id,
            SupplierClientId: this.navParams.get('SupplierClientId'),
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
        };
        this.etcCard.getEtcRechargeDetails(params2)
            .then(() => refresher.complete())
            //发生异常
            .catch(err => {
                refresher.complete();
                this.etcCard.toast(`发生异常${err}`)
            });
    }

    //上拉加载更多
    doInfinite(infiniteScroll: InfiniteScroll) {
        let params3 = {
            partyId: this.user.getUserInfo().id,
            SupplierClientId: this.navParams.get('SupplierClientId'),
            PageIndex: this.pageIndex++,
            PageSize: this.pageSize
        };
        this.etcCard.getEtcRechargeDetails(params3)
            .then(() => infiniteScroll.complete())
            //发生异常
            .catch(err => {
                infiniteScroll.complete();
                this.etcCard.toast(`发生异常${err}`)
            });
    }

    cancelWriteCard(card) {
        console.log('card', card);
        this.etcCard.toast('功能开发中，敬请期待！');
    }

    refund(card, i) {
        console.log('card&i', card, i);
        let loader = this.etcCard.loading('退款中...');
        let param4 = {
            OrderId: card.orderId
        };
        this.etcCard.orderRefund(param4, i)
            .then(() => {
                loader.dismiss();
                this.etcCard.toast(`订单：${card.orderId}取消成功`)
            })
            //发生异常
            .catch(err => {
                loader.dismiss();
                this.etcCard.alert('发生异常', err, ['确定'])
            });
    }

    goPay(listParam) {

        // this.etcCard.gasPayMethod.accountNo=listParam.payAccountId;
        // this.etcCard.gasPayMethod.orderId=listParam.orderId;
        // //console.log(1212215511,listParam);
        // this.etcCard.getOrderDetail(listParam.orderId,listParam.payAccountId,function (data) {
        //     let paramNew={
        //         carNo: this.navParams.get('GasCardNo'),
        //         gasNum:data.context.Quantity,
        //         gasPrice:listParam.totoalAmount,
        //         SupplierName:this.navParams.get('SupplierName'),
        //         accountTypeName:data.context.AccTypeName,
        //     };
        //     this.navCtrl.push(EtcCardRechargeComponent,paramNew);
        // })
    }
}

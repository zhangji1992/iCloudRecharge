import {Component, OnInit}           from '@angular/core';
import {NavController, NavParams, Refresher, InfiniteScroll}             from 'ionic-angular';
import {GasCard}             from '../../providers/gas-card';
import {GasCardCharge1Component} from '../gas-card-charge1/gas-card-charge1';

@Component({
    selector: 'gas-card-charge-detail',
    templateUrl: 'gas-card-charge-detail.html'
})
export class GasCardChargeDetail implements OnInit {
    span01height: string;
    span02height: string;
    pageIndex: number;

    constructor(public gasCard: GasCard, public navParams: NavParams, private navCtrl: NavController) {
        this.span01height = '19px';
        this.span02height = '25px';
    }

    ngOnInit(): void {
        this.pageIndex = 0;
        let self = this;
        self.gasCard.gasCardChargeDetail = [];
        self.gasCard.getChargeList(self.navParams.data.SupplierClientId, this.pageIndex);
    }

    //下拉刷新列表
    doRefresh(refresh: Refresher) {
        let self = this;
        this.pageIndex = 0;
        this.gasCard.getChargeList(self.navParams.data.SupplierClientId, this.pageIndex);
        refresh.complete(); //刷新完成
    }

    //上拉加载更多
    doInfinite(infiniteScroll: InfiniteScroll) {
        let self = this;
        this.pageIndex = this.pageIndex + 1;
        console.info('load more');
        this.gasCard.getChargeList(self.navParams.data.SupplierClientId, this.pageIndex);
        infiniteScroll.complete();  //加载完成
    }

    cancleOrder(charge, index) {
        this.gasCard.cancleOrder(charge.purchaseOrderPartyId, charge.orderId, index);
    }

    moneyBack(charge, index) {
        this.gasCard.applyBackMoney(charge.orderId, index);
    }

    goToPay(listParam) {
        let self = this;

        self.gasCard.gasPayMethod.accountNo = listParam.payAccountId;
        self.gasCard.gasPayMethod.orderId = listParam.orderId;
        //console.log(1212215511,listParam);
        self.gasCard.getOrderDetail(listParam.orderId, listParam.payAccountId, function (data) {
            let paramNew = {
                carNo: self.navParams.data.GasCardNo,
                gasNum: data.context.Quantity,
                gasPrice: listParam.totoalAmount,
                SupplierName: self.navParams.data.SupplierName,
                accountTypeName: data.context.AccTypeName,
            };
            self.navCtrl.push(GasCardCharge1Component, paramNew);
        })
    }
}


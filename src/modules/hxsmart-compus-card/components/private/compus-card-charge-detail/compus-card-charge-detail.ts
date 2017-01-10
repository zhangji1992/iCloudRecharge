import {Component, OnInit}           from '@angular/core';
import {CompusCard}                 from '../../../providers/compus-card';
import {NavController, Refresher, InfiniteScroll, NavParams}                from 'ionic-angular';
import {CompusCardCharge1Component} from '../../compus-card-charge1/compus-card-charge1';
@Component({
    selector: 'compus-card-charge-detail',
    templateUrl: 'compus-card-charge-detail.html'
})
export class CompusCardChargeDetail implements OnInit {

    pageIndex: number;
    compusToPayObj: any;

    constructor(public compusCard: CompusCard,
                private navCtr: NavController,
                public navParams: NavParams) {
        this.compusToPayObj = this.navParams.data;
    }

    ngOnInit(): void {
        this.compusCard.chargeList = [];
        this.compusCard.compusChargeList(this.navParams.data.ClientPartyId, this.navParams.data.SupplierClientId, 0);
        this.pageIndex = 0;
    }

    //下拉刷新列表
    doRefresh(refresh: Refresher) {
        this.pageIndex = 0;
        this.compusCard.compusChargeList(this.navParams.data.ClientPartyId, this.navParams.data.SupplierClientId, 0);
        refresh.complete(); //刷新完成
    }

    //上拉加载更多
    doInfinite(infiniteScroll: InfiniteScroll) {
        this.pageIndex = this.pageIndex + 1;
        console.info('load more');
        this.compusCard.compusChargeList(this.navParams.data.ClientPartyId, this.navParams.data.SupplierClientId, this.pageIndex);
        infiniteScroll.complete();  //加载完成
    }

    //撤销写卡
    cancleWriteCrad(charge, index): void {
        this.compusCard.cancleWriteCard(charge.purchaseOrderPartyId, charge.orderId, index);
    }

    //申请退款
    applyBackMoney(charge, index): void {
        this.compusCard.applyBackMoney(charge.orderId, index);
    }

    //继续支付
    goToPay(obj): void {
        let self = this;
        console.log(obj);
        /*
         * ccompleteDatetime:"2016-12-20 08:42:09"
         collectPartyId:209
         deliverDatetime:null
         deliverStatus:1
         orderDate:"2016-12-20 08:42:09"
         orderId:"2016122008420879274279867"
         orderStatus:"未支付"
         payAccountId:43
         payChannelCode:"CGB"
         payOrderPartyId:209
         purchaseOrderPartyId:209
         supplierPartyId:38
         totoalAmount:500
         * */
        let compusObj = {
            HoldClientNname: self.compusToPayObj.HoldClientNname,
            SupplierName: self.compusToPayObj.SupplierName,
            CardNo: self.compusToPayObj.CardNo,
            chargeNum: obj.totoalAmount,
            chargeWay: ""
        }
        this.compusCard.setcompusPayObj(obj);
        this.navCtr.push(CompusCardCharge1Component, {compusCard: compusObj});
    }
}

import {Injectable} from '@angular/core';
import {interfaceUrl} from '../../../providers/serverUrl';
@Injectable()
export class CompusCardInterface {
    constructor() {

    }

    private postUrl = {
        "getInfo": interfaceUrl.getAccountInfo,//获取账户信息

        "allCampus": interfaceUrl.allCampus,//查询所有学校
        "compusCardDetail1": interfaceUrl.compusCardDetail1,//查询校园卡详情不需登录
        "compusCardDetail": interfaceUrl.compusCardDetail,//查询校园卡详情
        "bindCompusCard": interfaceUrl.bindCompusCard,//绑定校园卡
        "getBindCompusCard": interfaceUrl.getBindCompusCard,//查询已绑定校园卡
        "compusOrder": interfaceUrl.compusOrder,//校园卡充值下订单
        "compusPay": interfaceUrl.compusPay,//校园卡充值订单支付
        "compusChargeList": interfaceUrl.compusChargeList,//查询校园卡充值明细
        "cancleWriteCard": interfaceUrl.cancleWriteCard1,//撤销写卡
        "cancleBindCard": interfaceUrl.cancleBindCard1,//解除绑定
        "applyBackMoney": interfaceUrl.applyBackMoney1,//申请退款
        "compusConsumeList": interfaceUrl.compusConsumeList,//查询校园卡消费明细
        "compusPayWay": interfaceUrl.compusPayWay,//获取应用可用支付账户
        "compusOrderAndPay": interfaceUrl.GasGenOrderAndPay//校园卡充值下订单支付接口合并
    };

    getUrl(str): string {
        return this.postUrl[str];
    }
}

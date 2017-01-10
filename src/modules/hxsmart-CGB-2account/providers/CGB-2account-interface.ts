import {Injectable} from '@angular/core';
import {interfaceUrl} from "../../../providers/serverUrl";

@Injectable()
export class AccountInterface {
    // private server: string = "http://192.168.169.214:25080";

    // public bindExitAccount: string = /this.server + "/iCloudRecharge/payAccountexitscgbAccountBind";//绑定已存在广发Ⅱ类账户
    public bindExitAccount: string = interfaceUrl.bindExitAccount;//绑定已存在广发Ⅱ类账户
    // public bindNewAccount: string = this.server + "/iCloudRecharge/payAccount/bindingcgbNewAccount";//绑定新的广发Ⅱ类账户
    public bindNewAccount: string = interfaceUrl.bindNewAccount;//绑定新的广发Ⅱ类账户
    // public getAccountInfo: string = this.server + "/iCloudRecharge/payAccount/accountsInfo";//获取我的支付账户信息
    public getAccountInfo: string = interfaceUrl.getAccountInfo;//获取我的支付账户信息

    // public cancelBind: string = this.server + "/iCloudRecharge/payAccount/cgbCancelBankSigned";//解绑
    public cancelBind: string = interfaceUrl.cancelBind;////解绑银行卡

    // public asyncAccountInfo: string = this.server + "/iCloudRecharge/payAccount/syncAccount";//同步广发Ⅱ类账户信息
    public asyncAccountInfo: string = interfaceUrl.asyncAccountInfo;//同步广发Ⅱ类账户信息

    // public checkAccountStatus: string = this.server + "/iCloudRecharge/payAccount/cgbAccountStatus";//判断广发Ⅱ类账户状态
    public checkAccountStatus: string = interfaceUrl.checkAccountStatus;//判断广发Ⅱ类账户状态

    // public accountRecharge: string = this.server + "/iCloudRecharge/payAccount/topUpCGBEaccount";//广发Ⅱ类账户充值
    public accountRecharge: string = interfaceUrl.accountRecharge;//广发Ⅱ类账户充值

    // public accountWithdraw: string = this.server + "/iCloudRecharge/payAccount/cgbWithdraw";//广发Ⅱ类账户提现
    public accountWithdraw: string = interfaceUrl.accountWithdraw;//广发Ⅱ类账户提现
    public dismissBindingAccount = interfaceUrl.dismissBindingAccount;//平台解绑二类账户


    // public openGCAccountAddress: string = "http://113.108.207.154:1513/lifeService.do?";//广发测试地址
    public openGCAccountAddress: string = interfaceUrl.openGCAccountAddress;//广发测试地址

    public channelId: string = interfaceUrl.channelId;//渠道号
    public signKey: string = interfaceUrl.signKey;//签名秘钥
    public waterNum: number = interfaceUrl.waterNum;//流水号
    public sucBackAddress = interfaceUrl.sucBackAddress;//成功回显地址
    // public dismissBindingAccount = this.server + "/iCloudRecharge/payAccount/dismissBindingAccount";//平台解绑二类账户
}

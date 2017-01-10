let serverUrl = {//可能匹配多个服务器地址,比如一个项目需要2个服务器

    // "localServer": "http://192.168.169.214:25080",//本地服务器地址
    "localServer": "http://hxsmart.3322.org:25080",//外网服务器地址
    "CGServer": "http://113.108.207.154:1513/lifeService.do?",//广发远程测试地址
    "CGBackServer": "http://a.zhongshantong.net/MyZhongShan/iosOpenEleAccountDone.html"//广发远程操作成功回显地址
};

/*
 * 接口地址的使用方法
 * import {interfaceUrl} from '../providers/serverUrl';
 *  this.http.post(interfaceUrl.bindExitAccount,data, {headers: this.headers})
 */
export const interfaceUrl = {//暴露具体接口的地址

    /*暴露本地地址*/
    "localServer": serverUrl.localServer,
    /*暴露本地地址*/


    /*广发2类账户接口 --> start*/
    //绑定已存在广发Ⅱ类账户1
    "bindExitAccount": serverUrl.localServer + "/iCloudRecharge/payAccount/exitscgbAccountBind",
    //绑定新的广发Ⅱ类账户2
    "bindNewAccount": serverUrl.localServer + "/iCloudRecharge/payAccount/bindingcgbNewAccount",
    //获取我的支付账户信息3
    "getAccountInfo": serverUrl.localServer + "/iCloudRecharge/payAccount/accountsInfo",
    //解绑银行卡4
    "cancelBind": serverUrl.localServer + "/iCloudRecharge/payAccount/cgbCancelBankSigned",
    //同步广发Ⅱ类账户信息5
    "asyncAccountInfo": serverUrl.localServer + "/iCloudRecharge/payAccount/syncAccount",
    //判断广发Ⅱ类账户状态6
    "checkAccountStatus": serverUrl.localServer + "/iCloudRecharge/payAccount/cgbAccountStatus",
    //广发Ⅱ类账户充值7
    "accountRecharge": serverUrl.localServer + "/iCloudRecharge/payAccount/topUpCGBEaccount",
    //广发Ⅱ类账户提现8
    "accountWithdraw": serverUrl.localServer + "/iCloudRecharge/payAccount/cgbWithdraw",
    //平台解绑二类账户9
    "dismissBindingAccount": serverUrl.localServer + "/iCloudRecharge/payAccount/dismissBindingAccount",
    /*广发2类账户接口 --> end*/


    /*广发远程测试的接口 --> start*/
    //广发远程测试地址1
    "openGCAccountAddress": serverUrl.CGServer,
    //广发远程测试成功回显地址2
    "sucBackAddress": serverUrl.CGBackServer,
    //流水号3
    "waterNum": new Date().getTime(),
    //渠道号4
    "channelId": "122",
    //签名秘钥5
    "signKey": "123456qwer654321fewq",
    /*广发远程测试的接口 --> end*/


    /*用户的接口 --> start*/
    //发送手机验证码1
    "sendMobileCode": serverUrl.localServer + `/iCloudRecharge/Message/sendMobileCode`,
    //验证手机验证码2
    "mobileConfirm": serverUrl.localServer + `/iCloudRecharge/Message/mobileConfirm`,
    //发送邮箱验证码3
    "sendEmailCode": serverUrl.localServer + `/iCloudRecharge/Message/sendEmailCode`,
    //验证邮箱验证码4
    "emailConfirm": serverUrl.localServer + `/iCloudRecharge/Message/emailConfirm`,
    //注册5
    "register": serverUrl.localServer + `/iCloudRecharge/Utile/register`,
    //登录6
    "login": serverUrl.localServer + `/iCloudRecharge/Utile/loginTest`,
    //登出7
    "logout": serverUrl.localServer + `/iCloudRecharge/Utile/loginOut`,
    //重置登录密码8
    "resetPwd": serverUrl.localServer + `/iCloudRecharge/Utile/resetPwd`,
    //修改登录密码9
    "modifyPwd": serverUrl.localServer + `/iCloudRecharge/Utile/modifyPwd`,
    //设置支付密码10
    "setPayPwd": serverUrl.localServer + `/iCloudRecharge/Utile/setPayPwd`,
    //重置支付密码11
    "resetPayPwd": serverUrl.localServer + `/iCloudRecharge/Utile/reSetPayPwd`,
    //绑定邮箱12
    "bindEmail": serverUrl.localServer + `/iCloudRecharge/Message/modifyEmail`,
    //修改绑定手机13
    "modifyMobile": serverUrl.localServer + `/iCloudRecharge/Message/modifyMobile`,
    /*用户的接口 --> end*/


    /*代办事项的接口 --> end*/
    //代办事项的数量
    "getTodoSize": serverUrl.localServer + `/iCloudRecharge/Todo/getSize`,
    //代办事项的内容
    "getTodoContent": serverUrl.localServer + `/iCloudRecharge/Todo/getTodo`,
    /*代办事项的接口 --> end*/


    /*消息的接口 --> start*/
    //消息的数量
    "MessageNumUrl": serverUrl.localServer + `/iCloudRecharge/Msg/Counts`,
    //消息的内容
    "myMessageUrl": serverUrl.localServer + `/iCloudRecharge/Msg/AllMessages`,
    /*消息事项的接口 --> end*/


    /*燃气卡的接口 --> start*/
    //查订单详细信息1
    "getOrderDetail": serverUrl.localServer + `/iCloudRecharge/Gas/OrderDetail`,
    //查询已绑定燃气卡2
    "getBindzGasCard": serverUrl.localServer + `/iCloudRecharge/Gas/GetBindingCard`,
    //查询所有燃气公司3
    "allGasCompany": serverUrl.localServer + `/iCloudRecharge/Gas/AllGasCompany`,
    //绑定燃气卡4
    "bindGasCard": serverUrl.localServer + `/iCloudRecharge/Gas/BindingGasCard`,
    //燃气卡支付方式5
    "gasPayWay": serverUrl.localServer + `/iCloudRecharge/Campus/AvaiablePayAccountType`,
    //获取账户信息6---在广发二类账户已有这个接口地址
    /* "getInfo": "payAccount/accountsInfo",//获取账户信息*/
    //燃气卡充值下订单7
    "gasOrder": serverUrl.localServer + `/iCloudRecharge/GasDeal/GenOrder`,
    //燃气卡充值订单支付8
    "gasOrderPay": serverUrl.localServer + `/iCloudRecharge/GasDeal/PayForOrder`,
    //申请退款9
    "applyBackMoney": serverUrl.localServer + `/iCloudRecharge/GasDeal/OrderRefund`,
    //取消订单10
    "cancleWriteCard": serverUrl.localServer + `/iCloudRecharge/GasDeal/CancelOrder`,
    //解除绑定11
    "cancleBindCard": serverUrl.localServer + `/iCloudRecharge/Gas/DismissBinding`,
    //查询燃气卡充值明细12
    "gasChargeList": serverUrl.localServer + `/iCloudRecharge/Gas/AdvanceRecords`,
    //查询燃气卡阶梯13
    "gasPriceStep": serverUrl.localServer + `/iCloudRecharge/Gas/findGasByCompany`,
    //查询卡是否已绑定14
    "gasCardIsBind": serverUrl.localServer + `/iCloudRecharge/Gas/IsCardBinded`,
    //下订单和支付整合到一个接口
    "GasGenOrderAndPay": serverUrl.localServer + `/iCloudRecharge/ModuleDeal/GenOrderAndPay`,
    /*燃气卡的接口 --> end*/


    /*etc的接口 --> start*/
    //查询Etc卡详情
    getEtcDetails: serverUrl.localServer + '/iCloudRecharge/ETC/ETCCardDetail',
    //查询已绑定Etc卡
    getBoundEtc: serverUrl.localServer + '/iCloudRecharge/ETC/GetBindingCard',
    //解绑Etc卡
    unBindEtc: serverUrl.localServer + '/iCloudRecharge/ETC/DismissBindingCard',
    //获取我的支付账户
    getAvailableAccount: serverUrl.localServer + '/iCloudRecharge/payAccount/accountsInfo',
    //充值Etc卡
    rechargeEtc: serverUrl.localServer + '/iCloudRecharge/ModuleDeal/GenOrderAndPaywoe',
    //查询Etc卡充值详情
    getEtcRechargeDetails: serverUrl.localServer + '/iCloudRecharge/ETC/AdvanceRecords',
    //绑定Etc卡
    bindEtc: serverUrl.localServer + '/iCloudRecharge/ETC/BindingETCCard',
    //Etc卡充值退款
    orderRefund: serverUrl.localServer + '/iCloudRecharge/ETC/OrderRefund',
    //获取后台可用账户类型
    getAvailablePayAccountTypes: serverUrl.localServer + '/iCloudRecharge/Common/AvaiablePayAccountType',
    /*etc的接口 --> end*/


    /*校园卡的接口 --> start*/
    // "login": "Utile/login",//登录1
    // "getInfo": "payAccount/accountsInfo",//获取账户信息2
    // "charge": "payAccount/topUpCGBEaccount",//充值3
    // "toCash": "payAccount/cgbWithdraw",//提现4
    //查询所有学校5
    "allCampus": serverUrl.localServer + "/iCloudRecharge/Campus/AllCampus",
    //查询校园卡详情不需登录6
    "compusCardDetail1": serverUrl.localServer + `/iCloudRecharge/Campus/SyncCardDetail`,
    //查询校园卡详情7
    "compusCardDetail": serverUrl.localServer + `/iCloudRecharge/Campus/GetCardDetail`,
    //绑定校园卡8
    "bindCompusCard": serverUrl.localServer + `/iCloudRecharge/Campus/BindingCard`,
    //查询已绑定校园卡9
    "getBindCompusCard": serverUrl.localServer + `/iCloudRecharge/Campus/GetBindingCard`,
    //校园卡充值下订单10
    "compusOrder": serverUrl.localServer + `/iCloudRecharge/CampusDeal/GenOrder`,
    //校园卡充值订单支付11
    "compusPay": serverUrl.localServer + `/iCloudRecharge/CampusDeal/PayForOrder`,
    //查询校园卡充值明细12
    "compusChargeList": serverUrl.localServer + `/iCloudRecharge/Campus/AdvanceRecords`,
    //撤销写卡13--重名
    "cancleWriteCard1": serverUrl.localServer + `/iCloudRecharge/CampusDeal/CancelOrder`,
    //解除绑定14--重名
    "cancleBindCard1": serverUrl.localServer + `/iCloudRecharge/Campus/DismissBinding`,
    //申请退款15--重名
    "applyBackMoney1": serverUrl.localServer + `/iCloudRecharge/CampusDeal/OrderRefund`,
    //查询校园卡消费明细16
    "compusConsumeList": serverUrl.localServer + `/iCloudRecharge/CampusDeal/ExpenseDetail`,
    //获取应用可用支付账户17
    "compusPayWay": serverUrl.localServer + `/iCloudRecharge/Campus/AvaiablePayAccountType`,
    /*校园卡的接口 --> end*/


    /*广告的接口 --> start*/
    //banner
    "adBannerListUrl": serverUrl.localServer + `/iCloudRecharge/adMgtController/search`,
    //detail
    "adDetailUrl": serverUrl.localServer + `/iCloudRecharge/adMgtController/getDetail`,
    //home
    "adHomeListUrl": serverUrl.localServer + `/iCloudRecharge/HomepageLayout/SerachPage1`,
    /*广告的接口 --> end*/


    /*关于的接口 --> start*/
    //增加意见反馈
    "feedbackUrl": serverUrl.localServer + `/iCloudRecharge/FeedBack/addFeedBack`,
    //查询最新版本信息
    "getLatestVerUrl": serverUrl.localServer + `/iCloudRecharge/AppVersion/searchLastestAppVersion`,
    //上传文件
    "UploadTempFile": serverUrl.localServer + `/iCloudRecharge/File/UploadTempFile`,
    /*关于的接口 --> end*/

    /*获取密钥的接口 --> start*/
    //获取密钥接口
    "GetSuitDynamicKey": serverUrl.localServer + `/iCloudRecharge/Util/GetSuitDynamicKey`,
    /*获取密钥的接口 --> end*/
};

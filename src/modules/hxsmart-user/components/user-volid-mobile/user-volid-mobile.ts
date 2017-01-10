import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {User} from "../../providers/user";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";
import {ViewController} from "ionic-angular";
/*
 * 使用方法<user-volid-mobile [verifyType]="verifyType" (confirmAfter)="confirmAfter($event)"></user-volid-mobile>
 * */

/**
 * 使用方法<user-volid-mobile [verifyType]="verifyType"
 *                           [mobilePhone]="mobilePhone"
 *                           [nextStr]="nextStr"
 *                           [chgOpt]="chgOpt"
 *                           (confirmAfter)="confirmAfter($event)"
 *                           (changeWay)="changeWay($event)">
 *     </user-volid-mobile>
 *
 *[verifyType]输入属性,手机号验证类型
 * [mobilePhone]输入属性,手机号
 * [nextStr]输入属性,设置验证验证码按钮显示内容,"complete":"完成";"save":"保存";其他,"下一步"
 * [chgOpt]输入属性,是否显示"切换邮箱"元素,一般情况下不需要,可直接忽略
 * (confirmAfter)输出属性,验证验证码按钮事件,输出{code:"验证码",phone:"手机号",type:"验证类型"}
 * (cahngeWay)输出属性,"切换邮箱"按钮事件,无输出,和[chgOpt]属性一起使用,一般情况不需要,可直接忽略
 */

@Component({
    selector: 'user-volid-mobile',
    templateUrl: 'user-volid-mobile.html'
})
export class UserVolidMobile implements OnDestroy {
    private phone: any;                 //手机号码
    private confirmCode: string;        //验证码
    private timerStatus: boolean;       //倒计时状态
    private nums: number = 59;               //倒计时时间
    private sendDisabled: boolean;      //发送验证码按钮是否可点击
    private clock: any;//定时器
    private phoneIpt: boolean = false;
    private nextStepInput: string;

    @Input() verifyType: string;        //验证类型
    @Input() mobilePhone: any;          //手机号
    @Input() nextStr: any;
    @Input() chgOpt: boolean;           //是否显示切换邮箱
    @Output() confirmAfter = new EventEmitter();
    @Output() changeWay = new EventEmitter();       //切换方式

    ngOnInit() {
        console.log(this.verifyType, "====", this.mobilePhone);
        if (this.mobilePhone) {
            this.phone = this.mobilePhone;
            this.phoneIpt = true;
        }
        if (this.nextStr == "complete") {
            this.nextStepInput = "完成";
        } else if (this.nextStr == "save") {
            this.nextStr = "保存";
        } else {
            this.nextStepInput = "下一步";
        }
    }

    ngOnDestroy() {
        console.log("销毁他！");
        clearInterval(this.clock);
    }

    constructor(public userService: User,
                public alert: AlertService,
                public toast: ToastService,
                public viewCtrl: ViewController) {
    }

    //发送验证码
    sendCode(): void {
        console.info("UserVolidMobile:", this.phone, this.verifyType);
        if (this.phone == "" || this.phone == undefined) {
            this.alert.presentAlert({msg: "手机号不能为空"});
        } else {
            let telReg = /^1(3|4|5|7|8)\d{9}$/;
            if (telReg.test(this.phone)) {
                this.userService.sendMobileCode({
                    "phone": this.phone,
                    "verifyCodePro": this.verifyType
                }).then(res => {
                    console.log("userVolidMobile", res);
                    // this.toast.presentToast({msg: "获取手机验证码成功"});
                    this.clock = setInterval(() => this.doLoop(), 1000);//启动计时器
                }, (err) => this.alert.presentAlert({msg: err}));
            } else {
                this.alert.presentAlert({msg: "请输入正确的手机号！"});
            }
        }
    }

    //验证验证码
    nextStep() {
        console.info("验证手机验证码:", this.phone, this.confirmCode);
        this.userService.mobileConfirm({
            "phone": this.phone,
            "verifyCodePro": this.verifyType,
            "verifyCode": this.confirmCode
        }).then(res => {
            console.log("验证手机验证码:", res);
            this.sendDisabled = false;//按钮可以点击
            this.timerStatus = false;
            this.nums = 60;
            clearInterval(this.clock);//清除定时器，防止内存泄露
            this.confirmAfter.emit({"code": this.confirmCode, "phone": this.phone, "type": this.verifyType});
            this.confirmCode = "";
        }, err => this.alert.presentAlert({msg: err}));
    }

    switchEmail(): void {
        clearInterval(this.clock);
        this.changeWay.emit();
    }

    // //递减函数--定时器
    public doLoop() {
        if (this.nums > 0) {
            this.timerStatus = true;
            this.sendDisabled = true;
            this.nums--;
        } else {
            clearInterval(this.clock);//清除定时器
            this.timerStatus = false;//取消页面倒计时显示
            this.sendDisabled = false;//按钮可以点击，可以继续发送验证码
            this.nums = 59;//重置时间
        }
        console.log(this.nums);
    }
}

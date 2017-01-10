import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../../providers/user";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";
@Component({
    selector: 'user-volid-email',
    templateUrl: 'user-volid-email.html'
})

export class UserVolidEmail {
    private email: any;                 //邮箱
    private confirmCode: string;        //验证码
    private tStatus: boolean = false;       //倒计时状态
    private nums: number = 120;               //倒计时时间
    private sDisabled: boolean;      //发送验证码按钮是否可点击
    private clock: any;//定时器
    private nextStepInput: string;
    private emailIpt: boolean;

    @Input() verifyType: string;
    @Input() emailAdd: any;
    @Input() nextStr: any;
    @Input() chgOpt: boolean;
    @Output() confirmAfter = new EventEmitter();
    @Output() changeWay = new EventEmitter();

    ngOnInit() {
        console.log(this.verifyType, "====", this.emailAdd);
        console.info(this.nextStr);
        if (this.emailAdd) {
            this.email = this.emailAdd;
            this.emailIpt = true;
        }
        if (this.nextStr == "complete") {
            this.nextStepInput = "完成";
        } else if (this.nextStr == "save") {
            this.nextStepInput = "保存";
        } else {
            this.nextStepInput = "下一步"
        }
    }

    ngOnDestroy() {
        console.log("销毁视图");
        clearInterval(this.clock);
    }

    constructor(public userService: User,
                public alert: AlertService,
                public toast: ToastService) {
    }

    //发送验证码
    sendCode(): void {
        console.info("UserVolidEmail:", this.email, this.verifyType);
        if (this.email == "" || this.email == undefined) {
            this.alert.presentAlert({msg: "邮箱不能为空"});
        } else {
            let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (emailReg.test(this.email)) {
                this.userService.sendEmailCode({
                    "email": this.email,
                    "verifyCodePro": this.verifyType
                }).then(res => {
                    console.log("userVolidEmail", res);
                    this.clock = setInterval(() => this.doLoop(), 1000);//启动计时器
                }, (err) => this.alert.presentAlert({msg: err}));
            } else {
                this.alert.presentAlert({msg: "请输入正确的邮箱地址！"});
            }
        }
    }

    //验证验证码
    nextStep() {
        console.info("验证邮箱验证码:", this.email, this.confirmCode, this.verifyType);
        this.userService.emailConfirm({
            "email": this.email,
            "verifyCodePro": this.verifyType,
            "verifyCode": this.confirmCode
        }).then(res => {
            console.info("验证邮箱验证码", res);
            this.sDisabled = false;//按钮可以点击
            this.tStatus = false;
            this.nums = 120;
            clearInterval(this.clock);//清除定时器，防止内存泄露
            console.log("aaaaaaaaaa:", this.verifyType);
            this.confirmAfter.emit({"code": this.confirmCode, "email": this.email, "type": this.verifyType});
            this.confirmCode = "";
        }, err => {
            this.alert.presentAlert({msg: err});
            console.log("验证失败")
        });
    }

    switchMobile(): void {
        clearInterval(this.clock);
        this.changeWay.emit();
    }

    // //递减函数--定时器
    public doLoop() {
        console.log("开始倒计时", this.nums, this.tStatus);
        if (this.nums > 0) {
            this.tStatus = true;
            this.sDisabled = true;
            this.nums--;
        } else {
            clearInterval(this.clock);//清除定时器
            this.tStatus = false;//取消页面倒计时显示
            this.sDisabled = false;//按钮可以点击，可以继续发送验证码
            this.nums = 120;//重置时间
        }
    }

}

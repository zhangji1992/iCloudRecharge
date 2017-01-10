import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../providers/user";
import {UserSetPwd} from '../user-set-pwd/user-set-pwd';
import {UserLogin} from "../user-login/user-login";
import {AlertService} from "../../providers/alert-service";
import {ToastService} from "../../providers/toast-service";

@Component({
    selector: 'user-register',
    templateUrl: 'user-register.html'
})
export class UserRegister {
    private phone = '';
    private userPhoneCode = '';
    private checked: boolean = true;

    constructor(public navCtrl: NavController,
                public userService: User,
                public alertService: AlertService,
                public toastService: ToastService) {
    }

    private disabled: Boolean;//发送验证码按钮是否可以点击
    //定时器绑定
    private clock: any;//定时器
    private timerStatus = false;//是否显示倒计时画面
    private nums = 60;//倒计时读秒
    //递减函数--定时器
    public doLoop() {
        if (this.nums > 0) {
            this.timerStatus = true;
            this.disabled = true;
            this.nums--;
        } else {
            clearInterval(this.clock);//清除定时器
            this.timerStatus = false;//取消页面倒计时显示
            this.disabled = false;//按钮可以点击，可以继续发送验证码
            this.nums = 60;//重置时间
        }
        console.log(this.nums);
    }

    ionViewWillLeave() {
        clearInterval(this.clock);
    }

    //发送手机验证码
    sendPhone(): void {
        if (this.phone == '' || this.phone == 'undefined') {
            this.alertService.presentAlert({msg: '手机号码不能为空！'});
        } else {
            let testReg = /^[1][34578][0-9]{9}$/;
            if (!testReg.test(this.phone)) {
                this.alertService.presentAlert({msg: '请输入正确的手机号码！'});
            } else {
                console.log("发送验证码:", this.phone);
                this.userService.sendMobileCode({
                    verifyCodePro: 'Register',
                    phone: this.phone
                }).then(res => {
                    console.info("发送手机验证码", res);
                    // this.toastService.presentToast({msg: '验证码发送成功！'});
                    this.clock = setInterval(() => this.doLoop(), 1000);//启动计时器
                }, (err) => {
                    this.toastService.presentToast({msg: err});
                    if (err == '您输入的手机号已被注册！') {
                        this.navCtrl.push(UserLogin);
                    }
                    console.log('错误提示1！', err);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    //验证手机验证码，跳转到设置密码组件
    toSetPwd(): void {
        if (!this.checked) {
            this.alertService.presentAlert({msg: '请阅读并同意《用户协议》'});
        } else {
            console.log("发送验证码:", this.phone, this.userPhoneCode);
            this.userService.mobileConfirm({
                verifyCodePro: 'Register',
                phone: this.phone,
                verifyCode: this.userPhoneCode
            }).then(res => {
                    console.log(res);
                    // this.toastService.presentToast({msg: '验证码验证成功！'});
                    this.disabled = false;
                    this.timerStatus = false;//取消倒计时
                    this.nums = 60;
                    clearInterval(this.clock);//取消定时器
                    this.navCtrl.push(UserSetPwd, {phone: this.phone, verifyCode: this.userPhoneCode});
                    this.userPhoneCode = '';
                }, (err) => {
                    this.toastService.presentToast({msg: err});
                    clearInterval(this.clock);//取消定时器
                    this.timerStatus = false;//取消倒计时
                    console.log('错误提示2！', err);
                }
            );
        }
    }

    //用户是否勾选用户协议
    changeChecked(): void {
        console.log("阅读用户协议!");
        this.checked = !this.checked;
    }

    goNext() {
        this.navCtrl.push(UserSetPwd);
    }
}



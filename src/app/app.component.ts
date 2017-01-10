import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import {HxsmartSecurity} from "../modules/hxsmart-native/providers/hxsmart-native";
import {interfaceUrl} from "../providers/serverUrl";


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = TabsPage;

    constructor(platform: Platform, security: HxsmartSecurity) {
        platform.ready().then((...rest) => {
            setTimeout(() => {
                Splashscreen.hide();
            }, 0);

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            security.setWorkKey(interfaceUrl.GetSuitDynamicKey)
                .then(() => {
                    console.log('密钥设置成功');
                }, (err) => {
                    console.log('密钥设置失败', err);
                });
            StatusBar.styleDefault();
        });
    }
}

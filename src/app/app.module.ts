import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {Community} from '../pages/community/community';
import {Mine} from '../pages/mine/mine';
import {Home} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {UserModule} from "../modules/hxsmart-user/user-module";
import {AboutModule} from "../modules/hxsmart-about/about-module";
import {AdModule} from '../modules/hxsmart-ad/ad-module';
import {ShortcutModule} from '../modules/hxsmart-shortcut/shortcut-module';
import {CompusCardModule} from '../modules/hxsmart-compus-card/compus-card-module';
import {GasCardModule} from '../modules/hxsmart-gas-card/gas-card-module';
import {FieldCardModule} from '../modules/hxsmart-field-card/hxsmart-field-card-module';
import {PayAccountModule} from '../modules/hxsmart-pay-account/hxsmart-pay-account-module';
import {CGB2AccountModule} from '../modules/hxsmart-CGB-2account/hxsmart-CGB-2account-module';
import {ToolModule} from '../modules/hxsmart-tool/tool-module';
import {NativeModule} from "../modules/hxsmart-native/native-module";
import {TodoModule} from "../modules/hxsmart-todo/todo-module";
import {MessagesModule} from "../modules/hxsmart-my-message/my-message-module";
import {Finance} from "../pages/finance/finance";
import {ETCCardModule} from "../modules/hxsmart-etc/etc-card-module";

@NgModule({
    declarations: [
        MyApp,
        Community,
        Mine,
        Home,
        Finance,
        TabsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            iconMode: 'ios',
            tabbarPlacement: 'bottom',
            pageTransition: 'ios',
            backButtonIcon: 'md-arrow-back',
            tabsHideOnSubPages: 'true',
            activator: 'highlight'
        }),
        UserModule,
        AboutModule,
        AdModule,
        ShortcutModule,
        CompusCardModule,
        FieldCardModule,
        MessagesModule,
        PayAccountModule,
        CGB2AccountModule,
        ToolModule,
        NativeModule,
        TodoModule,
        GasCardModule,
        ETCCardModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Community,
        Mine,
        Home,
        Finance,
        TabsPage
    ],
    providers: []
})
export class AppModule {
}

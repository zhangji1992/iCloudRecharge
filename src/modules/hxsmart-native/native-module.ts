import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {HxsmartCamera, HxsmartSecurity, HxsmartSharing, HxsmartMap, HxsmartNFC} from './providers/hxsmart-native';

@NgModule({
    imports: [IonicModule],
    declarations: [],
    entryComponents: [],
    exports: [],
    providers: [HxsmartCamera, HxsmartSecurity, HxsmartSharing, HxsmartMap, HxsmartNFC]
})

export class NativeModule {
}

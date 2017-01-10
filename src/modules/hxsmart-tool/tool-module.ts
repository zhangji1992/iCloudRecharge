import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {ToolStepsComponent} from './components/tool-steps/tool-steps';
import {TabsCtrl} from "./providers/tabs-ctrl";
import {ErrorTip} from "./providers/errorTip";
import {OcrCardRequestService} from "./providers/ocr-card-request";
import {OcrCardService} from "./providers/ocr-card";
import {ToolMockComponent} from "./mock/tool-mock";
import {AppUpdateService} from "./providers/app-update";

@NgModule({
    imports: [IonicModule],
    declarations: [ToolStepsComponent, ToolMockComponent],
    entryComponents: [ToolStepsComponent],
    exports: [ToolStepsComponent, ToolMockComponent],
    providers: [TabsCtrl, ErrorTip, OcrCardRequestService, OcrCardService, AppUpdateService]
})

export class ToolModule {
}

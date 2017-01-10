import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyMessagesService} from "./providers/messages";
import {MyMessage} from "./components/my-message/my-message";

@NgModule({
    imports: [IonicModule],
    declarations: [MyMessage],
    entryComponents: [MyMessage],
    exports: [MyMessage],
    providers: [MyMessagesService]
})
export class MessagesModule {
}

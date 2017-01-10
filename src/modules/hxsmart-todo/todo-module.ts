import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TodoList} from "./components/todo-list/todo-list";
import {Todo} from "./providers/todo";
import {ToolModule} from "../hxsmart-tool/tool-module";
@NgModule({
    imports: [IonicModule, ToolModule],
    declarations: [TodoList],
    entryComponents: [TodoList],
    exports: [],
    providers: [Todo]
})
export class TodoModule {
}

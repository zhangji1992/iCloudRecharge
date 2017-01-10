import {Component, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular';

import {Home} from '../home/home';
import {Community} from '../community/community';
import {Mine} from '../mine/mine';
import {Finance} from "../finance/finance";

@Component({
    templateUrl: 'tabs.html',
    providers: [Mine]
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = Home;
    tab2Root: any = Community;
    tab3Root: any = Finance;
    tab4Root: any = Mine;

    @ViewChild('myTabs') tabRef: Tabs;

    constructor(public mine: Mine) {

    }

    goToPage(index) {
        this.tabRef.select(index);
        this.mine.gotoFieldCard();
    }
}

import {Injectable} from '@angular/core';

@Injectable()
export class TabsCtrl {
    private _tabRef: any;

    constructor() {
        this._tabRef = document.querySelector('.tabbar');
    }

    show(): void {
        this._tabRef.style.display = 'flex';
    }

    hide(): void {
        this._tabRef.style.display = 'none';
    }

}

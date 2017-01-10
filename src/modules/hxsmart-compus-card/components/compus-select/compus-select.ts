import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {CompusCard} from '../../providers/compus-card';

@Component({
    selector: 'compus-select',
    templateUrl: 'compus-select.html'
})
export class CompusSelectComponent {
    items: any[];
    allItems: any[];
    selectCompus: any;
    searchCompus: string = "";
    confirmBol: boolean = true;

    constructor(public viewCtrl: ViewController,
                public compusCard: CompusCard) {
        let self = this;
        self.compusCard.getAllCompus(function (data) {
            console.log(data);
            self.allItems = data;
            self.items = self.allItems;
        });
    }

    selectChange(obj) {
        this.confirmBol = false;
        this.selectCompus = obj;
        this.searchCompus = this.selectCompus.supplierName;
        this.items = [];
        return false;
    };

    confirm() {
        let data = this.selectCompus;
        this.viewCtrl.dismiss(data);
    }

    close() {
        let data = {"supplierName": ""};
        this.viewCtrl.dismiss(data);
    }

    getItems(ev) {
        this.confirmBol = true;
        this.items = this.allItems;
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                let bol = true;
                for (let i = 0; i < val.length; i++) {
                    if (item.supplierName.toLowerCase().indexOf(val[i].toLowerCase()) > -1) {
                        bol = true;
                    } else {
                        bol = false;
                        return bol;
                    }
                }
                return bol;
            })
        }
    }

}

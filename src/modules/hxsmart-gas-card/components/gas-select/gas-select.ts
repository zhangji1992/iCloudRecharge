import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {GasCard}     from '../../providers/gas-card';


@Component({
    selector: 'gas-select',
    templateUrl: 'gas-select.html'
})
export class GasSelectComponent {
    items: any[];
    allItems: any[];
    selectCompus: any;
    searchCompus: string = "";
    confirmBol: boolean = true;

    constructor(public viewCtrl: ViewController,
                private gasCard: GasCard) {
        let self = this;
        self.gasCard.getAllGasCompany(function (data) {
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

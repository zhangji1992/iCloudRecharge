import {Component} from '@angular/core';
import {CGB2Account} from "../providers/CGB-2account";

@Component({
    templateUrl: 'account-mock.html'
})

export class AccountMock {

    constructor(private account: CGB2Account) {
    }

    getAccountInfo() {
        this.account.getAccountInfo({partyId: 42})
            .then(function (res) {
                console.log("成功1", res);
            }, function (err) {
                console.log("失败1", err);
            })
    }

    recharge() {
        this.account.accountRecharge({
            partyId: "42",
            account: "11561221001001320123",
            payAccount: "6214865300000006",
            payAmount: "10"
        })
            .then(
                (res) => {
                    console.log(res, '充值成功');
                },
                (err) => {
                    console.log(err, '充值失败');
                }
            )
    }

    withdraw() {
        this.account.accountWithdraw({
            partyId: "42",
            recAccount: "6214865300000006",
            payAccount: "11561221001001320123",
            payAmount: "10"
        })
            .then((res) => {
                    console.log(res, '提现成功');
                },
                (err) => {
                    console.log(err, '提现失败');
                })
    }

}

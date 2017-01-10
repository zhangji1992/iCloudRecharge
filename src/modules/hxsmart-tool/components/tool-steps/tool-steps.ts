import {Component, Input} from '@angular/core';
/*
 * 使用方法<tool-steps [stepNow]="stepNow" [stepCon]="stepCon"></tool-steps>
 * stepNow为当前步骤从1开始
 * stepCon为每一步的名称，eg：
 * stepNow=1;stepCon=["步骤一","步骤二","步骤三"];
 * */
@Component({
    selector: 'tool-steps',
    templateUrl: 'tool-steps.html'
})
export class ToolStepsComponent {
    stepWord: string[];
    stepWordNew: string[];
    stepNum: number;
    stepLast: string;
    // stepNow=1;
    // stepCon=['添加校园卡','手机验证','确认'];

    @Input() stepNow: number;
    @Input() stepCon: Array<string>;

    constructor() {
    }

    init(obj) {
        if (!obj) {
            return;
        }
        if (obj.hasOwnProperty('length')) {
            this.stepWord = obj;
            this.stepNum = this.stepWord.length;
            this.stepLast = this.stepWord[this.stepNum - 1];
            this.stepWordNew = this.stepWord;
            this.stepWordNew.pop();
        }
    }

    ngOnInit() {
        this.init(this.stepCon);
    }
}


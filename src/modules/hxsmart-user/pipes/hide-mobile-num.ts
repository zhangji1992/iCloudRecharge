import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hideMobileNum'})
export class HideMobileNum implements PipeTransform {
    transform(value: string): string {
        let head = value.slice(0, 3);
        let foot = value.slice(-4);
        let body = `${"*".repeat(value.length - 7)}`;
        return head + body + foot;
    }
}


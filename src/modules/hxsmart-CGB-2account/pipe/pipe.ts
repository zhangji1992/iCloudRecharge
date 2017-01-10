import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'transBody'})
export class TransBody implements PipeTransform {
    transform(value: string): string {
        if (!value || typeof (value) !== "string" || value.length < 9) {
            return value
        }
        else {
            let l = value.length;
            let defaultBody = ` ****`.repeat(Math.floor(l / 4) - 2);
            let body;
            switch (l % 4) {
                case 1:
                    body = defaultBody + `* `;
                    break;
                case 2:
                    body = defaultBody + ` ** `;
                    break;
                case 3:
                    body = defaultBody + ` *** `;
                    break;
                default:
                    body = defaultBody + ` `;
            }
            return value.slice(0, 4) + body + value.slice(-4);
        }
    }
}
@Pipe({name: 'transHeadBody'})
export class TransHeadBody implements PipeTransform {
    transform(value: string): string {
        if (!value || typeof (value) !== "string" || value.length < 9) {
            return value;
        }
        else {
            let l = value.length;
            let defaultBody = `****` + ` ****`.repeat(Math.floor(l / 4) - 2);
            let body;
            switch (l % 4) {
                case 1:
                    body = defaultBody + `* `;
                    break;
                case 2:
                    body = defaultBody + ` ** `;
                    break;
                case 3:
                    body = defaultBody + ` *** `;
                    break;
                default:
                    body = defaultBody + ` `;
            }
            return body + value.slice(-4);
        }
    }
}
@Pipe({name: 'footer'})
export class ShowFooter implements PipeTransform {
    transform(value: string): string {
        if (!value || typeof (value) !== "string" || value.length < 5) {
            return value;
        }
        else {
            return value.slice(-4);
        }
    }
}

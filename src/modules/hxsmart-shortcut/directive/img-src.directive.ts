import {Directive, ElementRef, Input, Renderer} from '@angular/core';
import {File} from "ionic-native";
import {Platform} from "ionic-angular";
declare const cordova: any;

@Directive({
    selector: '[imgSrc]'
})
export class ImgSrcDirective {
    private _file: string;

    constructor(private el: ElementRef,
                private renderer: Renderer,
                private platform: Platform) {
        // console.log('file', this._file);
    }

    @Input() set imgSrc(fileName: string) {
        this._file = fileName || '';
        this.readFile(this._file);
    }

    private readFile(fileName) {
        // console.log('platform', Device.device.platform);
        if (this.platform.is('android')) {
            const fs: string = cordova.file.externalRootDirectory;
            console.log('readFile params', fs, fileName);
            File.readAsText(fs, fileName)
                .then(
                    data => {
                        if (typeof data == "string") {
                            console.log('callback get imgSrc', data);
                            this.renderer.setElementAttribute(this.el.nativeElement, 'src', data);
                        }
                    })
                .catch(err => {
                    console.log('callback get imgSrc fail', err);
                });
        }
    }
}

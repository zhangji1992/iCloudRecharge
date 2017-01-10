/**
 * Created by Jimmy Luo  on 2016/11/25.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class imageUtilService {

    constructor() {
    }

    /**
     *
     * @param img 图片对象
     * @param width 图片宽度,不传则默认图像宽度
     * @param height 图片高度,不传则默认图像高度
     * @returns {string} 返回base64
     */
    public getBase64Image(img, width?, height?): string {
        let canvas = document.createElement("canvas");
        let ctx, dataURL;

        if (img instanceof Image) {
            canvas.width = width ? width : img.width;
            canvas.height = height ? height : img.height;

            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            dataURL = canvas.toDataURL();
            console.log();
        } else {
            console.warn('传入的img不是Image对象，image转base64失败');
        }
        return dataURL;
    };

    /**
     * 预加载图片
     * @param src 图片src，格式为字符串
     * @param afterLoadImage 图片加载后的回调函数,参数有I加载好的Image对象
     */
    public loadImage(src, afterLoadImage): void {
        let image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        console.log('路径*****', src);

        if (typeof src === 'string') {
            image.src = src;

            image.onload = function () {
                if (typeof afterLoadImage == 'function') {
                    afterLoadImage(image);
                }
            };
        } else {
            console.error('loadImage()的参数有误');
        }

    }

    public loadImage1(src): Promise<string> {
        return new Promise((resolve, reject) => {
            let image = new Image();
            //image.setAttribute('crossOrigin', 'anonymous');
            console.log('路径*****', src);

            if (typeof src === 'string') {
                image.src = src;

                image.onload = function () {
                    resolve(image);
                };
            } else {
                console.error('loadImage()的参数有误');
                reject('loadImage()的参数有误');
            }
        });
    }


}


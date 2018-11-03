import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from './translate.pipe';

@Pipe({
    name: 'translate',
    pure: false
})

export class TranslateTransformPipe implements PipeTransform {
    constructor (private translate: TranslatePipe) {}

    transform(key: string) {
        if (!this.translate || !this.translate.data ) {
            return key;
        }

        const keys = key.split('.');
        try {
            return (keys.length < 2 ? this.translate.data[keys[0]] : this.translate.data[keys[0]][keys[1]]);
        } catch (e) {
            return key;
        }
    }
}

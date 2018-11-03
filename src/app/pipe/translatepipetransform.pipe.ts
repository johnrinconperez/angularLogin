import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from './translate.pipe';

@Pipe({
    name: 'translate',
    pure: false
})

export class TranslateTransform implements PipeTransform {
    constructor (private translate: TranslatePipe) {}

    transform(key: any) {
        if (!this.translate || !this.translate.data ) {
            return key;
        }

        const keys: string [] = key.split('.');
        try {
            return (keys.length < 2 ? this.translate.data[keys[0]] : this.translate.data[keys[0]][keys[1]]);
        } catch (e) {
            return key;
        }
    }
}
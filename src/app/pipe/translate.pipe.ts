import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable ( {providedIn : 'root'} )

export class TranslatePipe {

    data: any;
    langCurrent: string;

    constructor (private http: HttpClient) { }

    use (lang: string): Promise<{}> {
        return new Promise<{}>((resolve, reject) => {
            try {
                this.langCurrent = lang || 'es';
                const path = `assets/i18n/lang.${ this.langCurrent }.json`;
                this.http.get<{}>(path).subscribe(
                    translation => {
                        this.data = Object.assign({}, translation || {});
                        resolve(this.data);
                    },
                    error => {
                        this.data = {};
                        resolve(this.data);
                    }
                );
            } catch (e) {
                this.data = {};
                resolve(this.data);
            }
        });
    }
}

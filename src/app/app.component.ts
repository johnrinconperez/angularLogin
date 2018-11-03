import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';
  constructor ( , private translate: TranslatePipe){
    this.translate.use ('en');
    this.translate.use ('en').then (() =>
      console.log (translate.data));
  }

}

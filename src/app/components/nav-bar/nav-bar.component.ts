import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { IUser } from 'src/app/models/user.model';
import { TranslatePipe } from 'src/app/pipe/translate.pipe';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: IUser;

  constructor(
    private identityService: IdentityService,
    private translate: TranslatePipe
  ) { }

  ngOnInit() {
    this.identityService.onUserChange.subscribe(ans => {
      console.log('onUserChange', ans);
      this.user = {...ans};
    });
  }

  isAuthenticated(): boolean {
    return this.identityService.isUthenticate();
  }

  isAdmin(): boolean {
    console.log(':( isAdmin');
    return this.identityService.isAdmin();
  }

  logOut(): void {
    this.identityService.logOut();
  }

  changeLanguage(): void {
    this.translate.use(
      this.translate.langCurrent === 'es' ? 'en' : 'es'
    );
  }

}

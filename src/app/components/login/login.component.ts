import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usr: string;
  psw: string;

  isValidated: boolean;
  isUserError: boolean;

  constructor(
    private identityService: IdentityService,
    private router: Router
    ) {
    this.isValidated = false;
    this.isUserError = false;
  }

  ngOnInit() {
  }

  validate() {
    this.isValidated = true;
    if (this.usr && this.psw) {
      this.identityService.authenticate(this.usr, this.psw).subscribe(ans => {
        if (ans) {
          this.router.navigate(['/account']);
        } else {
          this.isUserError = true;
        }
      });
    }
  }

  isValid(v: string): boolean {
    return !this.isValidated || this.isValidated && v ? true : false;
  }
}

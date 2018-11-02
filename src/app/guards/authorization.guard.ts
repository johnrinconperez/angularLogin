import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from '../services/identity.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private identityService: IdentityService,
    private router: Router
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ans = this.identityService.isUthenticate();
    if (!ans) {
      this.router.navigate(['/']);
    }
    return ans;
  }
}

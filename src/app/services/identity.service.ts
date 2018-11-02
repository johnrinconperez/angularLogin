import { Injectable, EventEmitter } from '@angular/core';
import { IUser, Role } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class IdentityService {

  user: IUser | undefined;
  onUserChange: EventEmitter<IUser | undefined> = new EventEmitter<IUser | undefined>();

  constructor(
    private router: Router
  ) {
    this.loadUser();
  }

  authenticate(usr: string, psw: string): Observable<IUser> {
    const ans = USER_DATA.find(u => u.userName === usr && u.password === psw);
    this.saveUser(ans);
    return of(ans);
  }

  saveUser(u: IUser) {
    this.user = {...u};
    localStorage.setItem('user', JSON.stringify(this.user));
    this.notify();
  }

  getCurrentUser(): IUser {
    return this.user;
  }

  logOut(): void {
    this.user = undefined;
    localStorage.removeItem('user');
    this.notify();
    this.router.navigate(['/']);
  }

  loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.notify();
  }

  notify() {
    this.onUserChange.emit(this.user);
  }

  isUthenticate(): boolean {
    return this.user ? true : false;
  }

  isAdmin(): boolean {
    return this.user && this.user.role === Role.admin ? true : false;
  }
}

const USER_DATA: IUser[] = [
  {
    name: 'Super profe',
    password: '12345',
    role: Role.admin,
    userName: 'profe123'
  },
  {
    name: 'chicho lorenzo',
    password: '12345',
    role: Role.user,
    userName: 'chicho'
  }
];

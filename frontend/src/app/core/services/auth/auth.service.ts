import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserInfo } from '@models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private userSubject: BehaviorSubject<UserInfo | undefined>;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('jwt');
      const user = this.token ? jwtDecode<{ user: UserInfo }>(this.token)?.user : null;
      this.userSubject = new BehaviorSubject<any>(user);
    } else {
      this.token = null;
      this.userSubject = new BehaviorSubject<any>(null);
    }
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jwt', token);
    this.userSubject.next(jwtDecode<{ user: UserInfo }>(this.token)?.user as UserInfo);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  getUserUpdates() {
    return this.userSubject.asObservable();
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    this.token = null;
    this.userSubject.next(undefined);
    this.clearLocalStorage();
    this.router.navigateByUrl('/login');
  }

  clearLocalStorage() {
    localStorage.removeItem('jwt');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {BehaviorSubject, config, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Data } from './loginData';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Data>;
  public currentUser: Observable<Data>;

  constructor(private http: HttpClient , private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Data>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Data {
    return this.currentUserSubject.value;
  }

  login(username, password) {

    // tslint:disable-next-line:variable-name
    const req_obj = {"username": username,"password": password};
    const body = JSON.stringify(req_obj);
    return this.http.post<any>(`http://127.0.0.1:8000/login/`, body)
      .pipe(map(user => {
        // tslint:disable-next-line:new-parens
        const data = new Data;
        if (user.status === 'success') {
          data.username = username;
          data.password = null;
          data.token = user.token;
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}

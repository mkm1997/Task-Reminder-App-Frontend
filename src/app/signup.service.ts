import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Data} from './loginData';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SignupService {

  private currentUserSubject: BehaviorSubject<Data>;
  public currentUser: Observable<Data>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Data>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  signup(username, password) {

    // tslint:disable-next-line:variable-name
    const req_obj = {"username": username,"password": password};
    const body = JSON.stringify(req_obj);
    return this.http.post<any>(`http://127.0.0.1:8000/signup/`, body)
      .pipe(map(user => {
        // tslint:disable-next-line:new-paren
        return user;
      }));
  }

}

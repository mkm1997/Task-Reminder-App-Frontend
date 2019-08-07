import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewtaskService {

  constructor(private httpclient: HttpClient, ) {
  }


  getAllTask() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + (JSON.parse(localStorage.getItem('currentUser')).token).toString()
      })
    };
    console.log('headers is ',  httpOptions );
    return this.httpclient.get('http://127.0.0.1:8000/getalltask', httpOptions);
  }
  getAlluser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + (JSON.parse(localStorage.getItem('currentUser')).token).toString()
      })
    };
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.set('Authorization', 'Token ' + JSON.parse(localStorage.getItem('currentUser')).token);
    console.log('headers is ',  httpOptions );
    return this.httpclient.get('http://127.0.0.1:8000/getalluser', httpOptions);

  }

  getSelectedUser(username) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + (JSON.parse(localStorage.getItem('currentUser')).token).toString()
      })
    };
    console.log('headers is ',  httpOptions );
    return this.httpclient.get('http://127.0.0.1:8000/getalltask/?assignee__username=' + username, httpOptions);

  }
}

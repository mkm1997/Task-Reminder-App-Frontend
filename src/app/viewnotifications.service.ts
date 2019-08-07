import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewnotificationsService {

  constructor(private httpclient: HttpClient, ) {
  }

  getnotifications() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + (JSON.parse(localStorage.getItem('currentUser')).token).toString()
      })
    };
    console.log('headers is ',  httpOptions );
    return this.httpclient.get('http://127.0.0.1:8000/getallnotification/', httpOptions);

  }
}

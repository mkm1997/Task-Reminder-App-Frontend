import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreatetaskService {

  constructor(private httpclient: HttpClient, ) {
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
  createTask(username, taskname, duedate) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Token ' + (JSON.parse(localStorage.getItem('currentUser')).token).toString()
      })
    };
    const req_obj = {"assignee": username, "task_name": taskname, "due_date": duedate};

    return this.httpclient.post<any>('http://127.0.0.1:8000/task/', req_obj, httpOptions)
      .pipe(map(response => {
        // tslint:disable-next-line:new-paren
        return response;
      }));

  }



}

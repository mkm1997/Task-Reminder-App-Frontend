import { Component, OnInit } from '@angular/core';
import {ViewtaskService} from '../viewtask.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  public  Data: any ;
  public Userdata: any ;
  constructor(private viewtaskservice: ViewtaskService) { }

  ngOnInit() {
    const chatSocket = new WebSocket(
      'ws://' + '127.0.0.1:8000' +
      '/notifications/');

    // tslint:disable-next-line:only-arrow-functions
    chatSocket.onmessage = function(e) {
      const demo = JSON.parse(e.data);
      alert(demo.message);
      console.log(demo);
    };
    // tslint:disable-next-line:only-arrow-functions
    chatSocket.onclose = function(e) {
      console.log(e);
      console.error('Chat socket closed unexpectedly');
    };
    this.getAllData();
    this.getuser();
  }
  onChange(username) {
    console.log(username);

    if (!(username === 'Select user')) {
      this.viewtaskservice.getSelectedUser(username)
        .subscribe(data => {
            console.log(data);
            // this.data = result.data ;
            this.Data = data;

          },
          error => {
            console.log(error);
          });
    } else {

      this.getAllData();
    }
    console.log(username);
  }

  getuser() {

    this.viewtaskservice.getAlluser()
      .subscribe(data => {
          console.log(data);
          // this.data = result.data ;
          this.Userdata = data;

        },
        error => {
          console.log(error);
        });

  }

  getAllData() {
    this.viewtaskservice.getAllTask().subscribe(data => {

        this.Data = data ;

      },
      error => {
        console.log(error);
      });
  }

}

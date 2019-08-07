import { Component, OnInit } from '@angular/core';
import {ViewnotificationsService} from '../viewnotifications.service';

@Component({
  selector: 'app-viewnotifications',
  templateUrl: './viewnotifications.component.html',
  styleUrls: ['./viewnotifications.component.css']
})
export class ViewnotificationsComponent implements OnInit {

  public Data: any;

  constructor(private viewnotificationservice: ViewnotificationsService) { }

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
    this.getAllnotifications();
  }
  getAllnotifications() {

    this.viewnotificationservice.getnotifications()
      .subscribe(data => {
          console.log(data);
          // this.data = result.data ;
          this.Data = data;

        },
        error => {
          console.log(error);
        });

  }

}

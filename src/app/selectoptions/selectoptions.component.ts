import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-selectoptions',
  templateUrl: './selectoptions.component.html',
  styleUrls: ['./selectoptions.component.css']
})
export class SelectoptionsComponent implements OnInit {

  constructor(private autheservice: AuthenticationService) { }

  ngOnInit() {
  }
  logout() {
    console.log("logout is pressed");
    this.autheservice.logout();
  }

}

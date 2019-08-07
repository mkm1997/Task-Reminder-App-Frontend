import { Component, OnInit } from '@angular/core';
import {CreatetaskService} from '../createtask.service';
import {first, map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  public Data: any;
  loading = false;
  // tslint:disable-next-line:ban-types
  message: string;
  submitted = false;
  createTaskForm: FormGroup;
  constructor(private createTaskservice: CreatetaskService ,  private formBuilder: FormBuilder , private router: Router) { }

  ngOnInit() {

    this.createTaskForm = this.formBuilder.group({
      assignee : ['', Validators.required],
      task_name : ['', Validators.required],
      due_date : ['', Validators.required],
    });
    const chatSocket = new WebSocket(
      'ws://' + '127.0.0.1:8000' +
      '/notifications/');

    // tslint:disable-next-line:only-arrow-functions
    chatSocket.onmessage = function(e) {
      const demo = JSON.parse(e.data);
      alert(demo.message);
      console.log(data);



    };
    // tslint:disable-next-line:only-arrow-functions
    chatSocket.onclose = function(e) {
      console.log(e);
      console.error('Chat socket closed unexpectedly');
    };
    console.log('data is ');
    this.getuser();
    const data = this.createTaskservice.getAlluser();
    console.log('data is ', data);
  }
  get f() { return this.createTaskForm.controls; }

  getuser() {

    this.createTaskservice.getAlluser()
      .subscribe(data => {
         console.log(data);
          // this.data = result.data ;
         this.Data = data;

        },
        error => {
          console.log(error);
        });

  }

  onSubmit() {
    console.log('hello you pressed the button ');
    this.submitted = true;
    // stop here if form is invalid
    if (this.createTaskForm.invalid) {
      return;
    }
    console.log('data is ', this.f.assignee.value, this.f.task_name.value, this.f.due_date.value.toLocaleString());
    this.createTaskservice.createTask(this.f.assignee.value, this.f.task_name.value, this.f.due_date.value.toLocaleString())
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 'success' ) {
            console.log('data is ' + data);
            this.router.navigate(['/login']);
          } else {
            this.message = data.message;
          }

        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
    this.loading = false;
  }


}

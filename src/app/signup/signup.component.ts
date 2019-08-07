import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Data} from '../loginData';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {SignupService} from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  // tslint:disable-next-line:ban-types
  message: string;
  submitted = false;
  returnUrl: string;
  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder,  private authenticationService: AuthenticationService,  private signupservice: SignupService, private router: Router) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get f() { return this.signupForm.controls; }

  onSubmit() {
    console.log('hello you pressed the button ');
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('hello you pressed the button ');
    this.signupservice.signup(this.f.username.value, this.f.password.value)
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

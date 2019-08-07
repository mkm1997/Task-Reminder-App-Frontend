import {Component, Input, OnInit} from '@angular/core';
import {Data} from '../loginData';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @Input() data: Data;
  constructor( private formBuilder: FormBuilder,  private authenticationService: AuthenticationService,  private router: Router) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log('hello you pressed the button ');
    console.log('form object is ', this.f);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log('hello you pressed the button ');
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
    this.loading = false;
  }


}

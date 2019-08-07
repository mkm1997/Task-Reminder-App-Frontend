import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register';
import { AuthguardGuard } from './authguard.guard';
import {SignupComponent} from './signup/signup.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {SelectoptionsComponent} from './selectoptions/selectoptions.component';
import {ViewtaskComponent} from './viewtask/viewtask.component';
import {ViewnotificationsComponent} from './viewnotifications/viewnotifications.component';

const routes: Routes = [
  { path: 'createtask', component: CreateTaskComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'selectoptions', component: SelectoptionsComponent , canActivate: [AuthguardGuard]},
  { path: 'viewtask', component: ViewtaskComponent , canActivate: [AuthguardGuard]},
  { path: 'viewnotification', component: ViewnotificationsComponent , canActivate: [AuthguardGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '/selectoptions' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/authService/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

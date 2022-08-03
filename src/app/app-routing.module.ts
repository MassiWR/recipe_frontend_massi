import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeDetailComponent } from './components/home/recipe-detail/recipe-detail.component';
import { ListsComponent } from './components/list/lists/lists.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/authService/auth.guard';


const routes: Routes = [
  {path: '', component:HomeComponent, pathMatch: 'full'},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'recipe-detail/:id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

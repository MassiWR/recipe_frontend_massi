import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeDetailComponent } from './components/home/recipe-detail/recipe-detail.component';
import { ListDetailComponent } from './components/list/list-detail/list-detail.component';
import { ListsComponent } from './components/list/lists.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/authService/auth.guard';


const routes: Routes = [
  {path: '', component:HomeComponent, pathMatch: 'full'},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'recipe-detail/:id', component: RecipeDetailComponent},
  {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
  {path: 'list-detail', component: ListDetailComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

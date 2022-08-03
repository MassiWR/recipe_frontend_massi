import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   endpoint: string = environment.REST_API_URL;
   headers = new HttpHeaders().set('Content-Type', 'application/json');
   currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}


  // sign up user and navigate to login page
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    let post = this.http.post<any>(api, user).pipe(catchError(this.handleError));
    //this.router.navigate(['sign-in']);
    return post;
  }




  // sign in user
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('user_id', res.user.id);

      this.getUserProfile().subscribe((res: any) => {
        this.currentUser = res;
        this.router.navigate(['']);
      });
    });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    if(removeToken == null) {
      this.router.navigate(['sign-in']);
    }
  }

  // user profile

  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/user-profile`;
    return this.http.get(api, {headers: this.headers});
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }










}

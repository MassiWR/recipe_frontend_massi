import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from 'src/app/models/list';
import { Recipe } from 'src/app/models/recipe';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  REST_API_URL = environment.REST_API_URL;


  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    })
  }

  createList(title: string):Observable<any> {
    return this.http.post<any>(`${this.REST_API_URL}/list`,title, this.httpOptions);
  }

  getAllLists(user_id: number):Observable<any> {
    return this.http.get<any>(`${this.REST_API_URL}/lists/${user_id}`, this.httpOptions);
  }

  getOneList(id: number): Observable<any> {
    return this.http.get<any>(`${this.REST_API_URL}/list/${id}`);
  }

  deleteList(id: number): Observable<any> {
    return this.http.delete<any>(`${this.REST_API_URL}/list/${id}`);
  }

  updateList(id: number, title: any): Observable<any> {
    return this.http.put(`${this.REST_API_URL}/list/${id}`, {title});
  }



}

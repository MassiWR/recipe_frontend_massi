import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Recipe} from '../../models/recipe';
import { map, share, filter, catchError, tap } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  REST_API_URL = environment.REST_API_URL;
  SPOON_RECIPE_URL = environment.API_SPOON_URL;

  // get 20 random recipes based on user preference
  private RANDOM_SPOON_URL = environment.RANDOM_SPOON_URL;
  private SPOON_API_KEY = environment.SPOON_API_KEY;

  constructor(private http: HttpClient) {}

  getRecipeById(recipe_id: number):Observable<any> {
    return this.http.get(`${this.SPOON_RECIPE_URL}${recipe_id}/information?apiKey=${this.SPOON_API_KEY}`);
  }

  getAll(dishTypes: string, diets: string): Observable<any> {
  return this.http.get<any>
  (`${this.RANDOM_SPOON_URL}${dishTypes ? `&tags=` + dishTypes : ""}${diets ? `?tags=` + diets: ""}`);
  }

  addToList(recipe_id: number, photo: any, user_list_id: number, title: string):Observable<any> {
    return this.http.post(`${this.REST_API_URL}/recipies`, {recipe_id, photo, user_list_id, title});
  }

  getRecipesFromList(id: number): Observable<any> {
  return this.http.get(`${this.REST_API_URL}/recipies/${id}`);
  }

  deleteRecipeFromList(id: number): Observable<any> {
  return this.http.delete(`${this.REST_API_URL}/recipies/${id}`);
  }





}

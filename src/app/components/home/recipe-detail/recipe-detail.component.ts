import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list';
import { Recipe } from 'src/app/models/recipe';
import { ListService } from 'src/app/services/listService/list.service';
import { RecipeService } from 'src/app/services/recipeService/recipe.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: any;
  id!: any;
  user_id!: number;
  instructions: string[] = [];
  lists: List[] = [];
  message!: string;
  extendedIngridients: string[] = [];

  constructor(
    public route: ActivatedRoute,
    private recipeService: RecipeService,
    public authService: AuthService,
    public listService: ListService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.recipeService.getRecipeById(this.id).subscribe((recipe_data: any) => {
      this.recipe = recipe_data;
      console.log(this.recipe);
      console.log(recipe_data.extendedIngredients);
      recipe_data.extendedIngredients.forEach((element: any) => {
        this.extendedIngridients.push(element.original);
        console.log(this.extendedIngridients);
      });

    });

    this.authService.getUserProfile().subscribe((data: any) => {
      console.log(data.id);
      this.user_id = data.id;
      this.listService.getAllLists(this.user_id).subscribe((data) => {
      this.lists = data;
      console.log(data);
    });
    });

  }



  addToList(recipe_id: number, photo: any, user_list_id: number, title: string): void {
    this.recipeService.addToList(recipe_id, photo, user_list_id, title).subscribe((data) => {
      console.log(data);
      this.message = data.message;
      console.log(this.message);

    });
  }

}

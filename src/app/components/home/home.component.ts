import { Component, Injectable, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipeService/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ListService } from 'src/app/services/listService/list.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  preferencesForm!: FormGroup;
  recipes: any[] = [];
  dishType!: string;
  diets!: string;
  isLoading!: boolean;
  id!: number;
  isEmpty!: boolean;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
      private fb: FormBuilder, public listService: ListService
    ) {}

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      diets: [''],
      dishType: [''],
    });
    this.recipeService.getAll(this.dishType, this.diets).subscribe((data) => {
        this.recipes = data.recipes;
       if(this.recipes.length == 0) {
        this.isEmpty = true;
      } else {
        this.isLoading = false;
        this.isEmpty = false;
      }
    });
  }

  getRecipies(form: FormGroup):void {
    this.isLoading = true;
    this.recipeService.getAll(form.value.dishType, form.value.diets).subscribe((data) => {
        this.recipes = data.recipes;
        if(this.recipes.length === 0) {
          this.isEmpty = true;
          this.isLoading = false;
          return;
        }
        this.isLoading = false;
        this.isEmpty = false;
    });
  }

}

import { Component, Injectable, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipeService/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from 'src/app/models/list';
import { AuthService } from 'src/app/services/authService/auth.service';

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
  constructor() { }

  ngOnInit(): void {
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/listService/list.service';
import { RecipeService } from 'src/app/services/recipeService/recipe.service';
import { AuthService } from 'src/app/services/authService/auth.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[] = [];
  title!: string;
  addListForm!: FormGroup;
  formSubscription!: Subscription;
  user_id!: number;
  list_id!: number;
  recipes!: any;
  message!: string;
  deleteMessage!: string;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
     this.addListForm = this.formBuilder.group({
      title: ['', {
          validators: [
            Validators.required,
            Validators.pattern('^[_A-z0-9- \s]+$')
          ],
          updateOn: 'blur',
      }]
    });

    this.authService.getUserProfile().subscribe((user) => {
      this.user_id = user.id;
      console.log(this.user_id);
      this.listService.getAllLists(this.user_id).subscribe((list) => {
      console.log(list);
      this.lists = list;
      this.recipeService.getRecipesFromList(this.list_id).subscribe((recipe) => {
        console.log(this.user_id);
        console.log(recipe);
      })
    });
    });


  }
  createList(): any {
    if (!this.addListForm.valid) {
      alert('Please fill in a valid title to add a new list!');
      return false;
    }
    this.formSubscription = this.listService
      .createList(this.addListForm.value)
      .subscribe(
        (data) => {
          this.message = data.message;
          console.log(this.message);

          console.log(this.formSubscription);
          this.formSubscription.unsubscribe();
          this.ngOnInit();
        }
      );
  }

getList(id: number): void {
  this.listService.getOneList(id).subscribe((list_id) => {
    console.log(list_id[0].id);
    this.list_id = list_id[0].id;

    this.recipeService.getRecipesFromList(this.list_id).subscribe((recipes: any) => {
      console.log(this.list_id);
      this.recipes = recipes;
      console.log(this.recipes);
    });
  });
}

deleteRecipe(id: number): void {
  this.recipeService.deleteRecipeFromList(id).subscribe((data) => {
    console.log(data);
    this.deleteMessage = data.message;
    this.ngOnInit();
  })
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/listService/list.service';
import { RecipeService } from 'src/app/services/recipeService/recipe.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  user_id!: number;
  list_id!: number;
  lists!: any;
  update: boolean = false;
  updateListForm!: FormGroup;
  title!: string;
  updateMessage!: string;
  deleteMessage!: string;

  constructor(
    private listService: ListService,
    private recipeService: RecipeService,
    private authService: AuthService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
       this.updateListForm = this.formBuilder.group({
      title: ['', {
          validators: [
            Validators.required,
            Validators.pattern('^[_A-z0-9- \s]+$')
          ],
          updateOn: 'blur',
      }]
    });

    this.authService.getUserProfile().subscribe((data) => {
      this.user_id = data.id;
      this.listService.getAllLists(this.user_id).subscribe((list) => {
        this.lists = list;
      })
    });


  }
  deleteList(id: any) {
  this.listService.getOneList(id).subscribe((list_id: any) => {
    this.list_id = list_id[0].id;
    this.listService.deleteList(this.list_id).subscribe((message) => {
      this.deleteMessage = message.message;
      this.ngOnInit();
    });
  });


}

onUpdate(id: number):void {
  this.update = true;
  this.listService.getOneList(id).subscribe((list_id: any) => {
    this.list_id = list_id[0].id;
  })
}

updateList(id: number): void {
  this.listService.updateList(id, this.updateListForm.value.title).subscribe((message) => {
    this.updateMessage = message.message;
    this.ngOnInit();
  });
}



}

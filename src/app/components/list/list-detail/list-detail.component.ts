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
      console.log(this.user_id);
      this.listService.getAllLists(this.user_id).subscribe((list) => {
        this.lists = list;
        console.log(this.list_id);
        console.log(list);
      })
    });


  }
  deleteList(id: any) {
  console.log(this.user_id);
  this.listService.getOneList(id).subscribe((list_id: any) => {
    this.list_id = list_id[0].id;
    console.log(this.list_id);
    this.listService.deleteList(this.list_id).subscribe((message) => {
      console.log(message);
      this.deleteMessage = message.message;
      this.ngOnInit();
    });
  });


}

onUpdate(id: number):void {
  this.update = true;
  this.listService.getOneList(id).subscribe((list_id: any) => {
    this.list_id = list_id[0].id;
    console.log(this.list_id);
  })
}

updateList(id: number): void {
  this.listService.updateList(id, this.updateListForm.value.title).subscribe((message) => {
    console.log(message);
    this.updateMessage = message.message;
    console.log(this.updateMessage);
    this.ngOnInit();
  });
}



}

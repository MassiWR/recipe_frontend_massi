import { Component } from '@angular/core';
import { AuthService } from './services/authService/auth.service';
import { RecipeService } from './services/recipeService/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]

})
export class AppComponent {
  title = 'recipeAPP';

  constructor(public authService: AuthService, private recipeService: RecipeService) {}
  logout() {
    this.authService.doLogout();
  }

}

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {

  formData = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    ingredients: new FormControl("", [Validators.required]),
    instructions: new FormControl("", [Validators.required]),
    image: new FormControl(""),
  })

  authService = inject(AuthService);

  constructor(private router: Router, private http: HttpClient){
  }

  addNewRecipe() {
    if (this.formData.valid) {
      if (this.authService?.isLoggedIn) {
        const recipe = {
          userId: this.authService.getCurrentUserId,
          name: this.formData.value.name,
          description: this.formData.value.description,
          ingredients: this.formData.value.ingredients,
          instructions: this.formData.value.instructions,
          image: this.formData.value.image
        };
        console.log("recipe", recipe)
        this.http.post("http://localhost:3000/recipe/new", recipe).subscribe(
          {
            next: () => {
              this.router.navigate(['/'])
            },
            error: (err) => {
              console.log(err)
            }
          }
        )
      }
    }
  }
}

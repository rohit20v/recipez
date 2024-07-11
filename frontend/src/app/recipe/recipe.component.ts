import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  authService = inject(AuthService);
  @Input() userId?: number
  @Input() id?: number
  @Input() name = "Default name"
  @Input() ingredients = "Default ingredients"
  @Input() image = "NO image found"
  @Input() description = "Default description"
  @Output() recipeRemoved = new EventEmitter<number>();

  http = inject(HttpClient);
  httpSub?: Subscription

  removeRecipe() {
    this.httpSub = this.http.delete(`${environment.eliminationUrl}${(this.id)}`).subscribe({
      next: () => {
        this.recipeRemoved.emit(this.id);
      },
      error: err =>
        console.log(err)
    })
  }
}

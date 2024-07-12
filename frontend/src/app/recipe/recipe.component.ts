import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  authService = inject(AuthService);
  @Input() userId?: number
  @Input() recipeUserId?: number
  @Input() id?: number
  @Input() name = "Default name"
  @Input() ingredients = "Default ingredients"
  @Input() image = "NO image found"
  @Input() description = "Default description"
  @Output() recipeRemoved = new EventEmitter<number>();
  @Input() fav?: boolean

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

  updateFav() {
    this.fav = !this.fav

    const body = {
      isFav: this.fav,
      userId: this.userId,
      recipeId: this.id
    }
    this.http.put("http://localhost:3000/fav", body).subscribe({
      next: () => {
        console.log('Updated successfully')
      },
      error: err =>
        console.log(err)
    })
  }

  goToDetails() {

  }
}

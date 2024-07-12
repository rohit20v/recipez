import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RecipeComponent} from "../recipe/recipe.component";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RecipeComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  fav?: any
  recipes?: RecipeComponent[]
  recipeSub?: Subscription;
  favSub?: Subscription;

  authService = inject(AuthService)

  constructor(private http: HttpClient,) {
  }

  ngOnInit() {
    this.recipeSub = this.http.get('http://localhost:3000/recipe/all').subscribe(
      (res: any) => {
        this.recipes = res.data
        this.loadUserFavorites()
      },
      err => {
        console.log(err)
      }
    )
  }

  loadUserFavorites() {
    const userId = this.authService.getCurrentUserId;
    if (userId) {
      this.favSub = this.http.get(`http://localhost:3000/fav/${userId}`).subscribe(
        (res: any) => {
          this.fav = res.data
          console.log(this.fav[0].isFav)
          return this.fav[0]
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
    if (this.favSub) {
      this.favSub.unsubscribe();
    }
  }
  removeRecipeFromList(id: number) {
    console.log(id)
    this.recipes = this.recipes?.filter(recipe => recipe.id !== id);
  }

}

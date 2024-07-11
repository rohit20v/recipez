import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeComponent} from "../recipe/recipe.component";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Subscription} from "rxjs";

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
  recipes?: RecipeComponent[]
  recipeSub?: Subscription;

  constructor(private http: HttpClient,) {
  }

  ngOnInit() {
    this.recipeSub = this.http.get('http://localhost:3000/recipe/all').subscribe(
      (res: any) => {
        this.recipes = res.data
        console.log(res.data)
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }

  removeRecipeFromList(id: number) {
    console.log(id)
    this.recipes = this.recipes?.filter(recipe => recipe.id !== id);
  }

}

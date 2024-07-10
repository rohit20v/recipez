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
  // template: `<div>h</div>`,
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
}

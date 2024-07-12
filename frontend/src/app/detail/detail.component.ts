import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute)

  httpSub?: Subscription

  constructor(private http: HttpClient) {
  }

  recipe?: any;

  ngOnDestroy(): void {
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    const {id} = this.route.snapshot.params ?? {};

    console.log(id)
    this.httpSub = this.http.get('http://localhost:3000/recipe/' + id).subscribe({
      next: (recipe: any) => {
        this.recipe = recipe.data
      },
      error: err => {
        console.log(err)
      }
    })


  }
}

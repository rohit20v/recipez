import {Component, inject, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

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
  @Input() name = "Default name"
  @Input() ingredients = "Default ingredients"
  @Input() image = "NO image found"
  @Input() description = "Default description"
}

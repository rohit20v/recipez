import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input() name = "Default name"
  @Input() ingredients = "Default ingredients"
  @Input() image = "NO image found"
  @Input() description = "Default description"
}

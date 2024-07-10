import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {HomeComponent} from "./home/home.component";
import {AddRecipeComponent} from "./add-recipe/add-recipe.component";
import {AuthGuard} from "./auth.guard.guard";

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "home", component: HomeComponent},
  {path: "add-recipe", component: AddRecipeComponent, canActivate:[AuthGuard]},
  { path: '' || "**", redirectTo: '/home', pathMatch: 'full' },
];

import {Router} from "express";
import {addNewRecipe, getAllRecipes} from "../controllers/recipe.controller";

const recipeRouter = Router();

recipeRouter.get("/all", getAllRecipes);
recipeRouter.post("/new", addNewRecipe);

export default recipeRouter;
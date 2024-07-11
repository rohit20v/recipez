import {Router} from "express";
import {addNewRecipe, delRecipeById, getAllRecipes} from "../controllers/recipe.controller";

const recipeRouter = Router();

recipeRouter.get("/all", getAllRecipes);
recipeRouter.post("/new", addNewRecipe);
recipeRouter.delete("/del/:id", delRecipeById);

export default recipeRouter;
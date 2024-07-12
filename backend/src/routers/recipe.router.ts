import {Router} from "express";
import {addNewRecipe, delRecipeById, getAllRecipes, getRecipeById} from "../controllers/recipe.controller";

const recipeRouter = Router();

recipeRouter.get("/all", getAllRecipes);
recipeRouter.post("/new", addNewRecipe);
recipeRouter.delete("/del/:id", delRecipeById);
recipeRouter.get("/:id", getRecipeById);

export default recipeRouter;
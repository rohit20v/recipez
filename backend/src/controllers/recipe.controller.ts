import {PrismaClient} from "@prisma/client";
import express from "express";

const recipeClient = new PrismaClient().recipe

// get all recipes
export const getAllRecipes = async (req: express.Request, res: express.Response) => {
    try {
        const recipes = await recipeClient.findMany();

        res.status(200).json({data: recipes})

    } catch (err) {
        console.log(err)
    }
}

export const addNewRecipe = async (req: express.Request, res: express.Response) => {
    try{
        const {userId, name, description, ingredients, instructions} = req.body;
        if (!name || !userId || !description || !ingredients || !instructions) {
            return res.status(400).json({error: 'Missing input values'})
        }
        const newRecipe = await recipeClient.create({
            data: req.body,
        });
        res.status(220).json({data: newRecipe})
    }catch (err){
        console.log(err)
    }
}
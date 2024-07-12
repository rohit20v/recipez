import {PrismaClient} from "@prisma/client";
import express from "express";

const favClient = new PrismaClient().fav

export const updateFav = async (req: express.Request, res: express.Response) => {
    try{

        const { userId, recipeId, isFav } = req.body;

        const updated = await favClient.upsert({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
            update: {
                isFav,
            },
            create: {
                userId,
                recipeId,
                isFav,
            },
        });

        res.status(200).send({data: updated})
    }catch (err){
        console.log(err)
    }
}

export const getAllFav = async (req: express.Request, res: express.Response) => {
    try{
        const favArray = []
        const favorites = await favClient.findMany({
            where:{
                userId: parseInt(req.params.userId)
            },
            select:{
                isFav: true
            }
        })

        if (favorites){
            favArray.push(...favorites)
        }
        res.status(200).json({data: favArray})
    }catch (err){
        console.log(err)
    }
}
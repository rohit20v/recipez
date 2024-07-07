import {PrismaClient} from "@prisma/client";
import express from "express";
import userRouter from "../routers/user.router";

const userClient = new PrismaClient().user

//get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await userClient.findMany({
            include: {
                recipes: true
            }
        });

        res.status(200).json({data: users})

    } catch (err) {
        console.log(err)
    }
}

//get user by id
export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const user = await userClient.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                recipes: true
            }
        });

        res.status(200).json({data: user})

    } catch (err) {
        console.log(err)
    }
}
//create user
export const createUser = async (req: express.Request, res: express.Response) => {
    try {

        const userBody = req.body
        console.log('Request Body:', req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }
        const user = await userClient.create({
            data: userBody
        });

        res.status(200).json({data: user})

    } catch (err) {
        console.log(err)
    }
}

//create user
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id
        const user = await userClient.delete({
            where:{
                id: parseInt(userId)
            }
        });

        res.status(200).json({data: {user}})

    } catch (err) {
        console.log(err)
    }
}
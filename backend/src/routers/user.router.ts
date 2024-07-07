import {Router} from "express";
import {createUser, deleteUser, getAllUsers, getUserById} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.post('/', createUser)
userRouter.get('/:id', deleteUser)

export default userRouter

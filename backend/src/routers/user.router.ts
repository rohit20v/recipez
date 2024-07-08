import {Router} from "express";
import {createUser, deleteUser, getAllUsers, loginUser} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/', createUser)
userRouter.get('/:id', deleteUser)
userRouter.post('/login', loginUser);


export default userRouter

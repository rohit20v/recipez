import {Router} from "express";
import {getAllFav, updateFav} from "../controllers/favorite.controller";

const favRouter = Router();

favRouter.put("/", updateFav);
favRouter.get("/:userId", getAllFav);

export default favRouter;
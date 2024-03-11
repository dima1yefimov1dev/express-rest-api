import { Router } from "express";
import { registerNewUser } from "../controllers/usersControllers";

export const usersRouter = Router();

usersRouter.post('/register', registerNewUser);
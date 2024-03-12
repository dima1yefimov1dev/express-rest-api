import { Router } from "express";
import usersControllers from "../controllers/userControllers";
import { body } from "express-validator";

export const authRouter = Router();

authRouter.post(
  '/signup', 
  body('email').isEmail(),
  body('password').isString(),
  body('password').isLength({min: 5, max: 12}),
  usersControllers.registration,
);

authRouter.post('/signin', usersControllers.login);

authRouter.post('/signout', usersControllers.logout);

authRouter.post('/refresh', usersControllers.refresh);
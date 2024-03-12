import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import { Errors } from '../types/types';

class UserControllers{
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(Errors.Validation, errors.array()));
      }
      const {name, email, password, role} = req.body;
      const userData = await userService.registration(name, email, password, role);

      //set Cookies with refresh token for 30 day. calculated below
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, })

      return res.status(201).send(userData);
    } catch (err) {
      next(err);
    }
  };

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, 
        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.status(200).send('user logged in successfully');
    } catch (err) {
      next(err);
    }
  };

  async logout(req: Request, res: Response, next:NextFunction) {
    try {
      const {refreshToken} = req.cookies;

      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(200).send({token, message:'user logged out successfully'});
    } catch (err) {
      next(err);
    }
  }

  async refresh(req:Request, res:Response, next:NextFunction) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      const refreshedToken = userData.refreshToken;
      

      res.cookie('refreshToken', refreshedToken, 
        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return res.status(200).send('refreshed successfully');

    } catch (err) {
      next(err);
    }
  };
};

export default new UserControllers();
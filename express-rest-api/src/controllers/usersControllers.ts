import { Request, Response } from 'express';
import { registration } from '../services/userService';

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.status(400).send('provide all necessary fields');
    }

    const registeredUser = await registration(name, email, password);

    if (registeredUser) {
      res.status(201).send(registeredUser);
    }

  } catch (err) {
    res.status(400).send(err.message);
  }
};
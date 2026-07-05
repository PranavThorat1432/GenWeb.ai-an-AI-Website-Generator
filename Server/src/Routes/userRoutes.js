import express from 'express';
import { getCurrentUser } from '../Controllers/userController.js';
import isAuth from '../Middleware/isAuth.js';

const userRouter = express.Router();

userRouter.get('/get-user', isAuth, getCurrentUser);

export default userRouter;

import express from 'express';
import isAuth from '../Middleware/isAuth.js';
import { billing } from '../Controllers/billingController.js';

const billingRouter = express.Router();

billingRouter.post('/', isAuth, billing);

export default billingRouter;

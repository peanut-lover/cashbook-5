import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import wrapAsync from '../utils/wrap-async';

const authRouter = Router();

authRouter.get('/callback', wrapAsync(AuthController.callback));

export default authRouter;

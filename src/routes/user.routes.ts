import { Router } from 'express';
import { container } from 'tsyringe';
import { UserServices } from '../services/user.service';
import { ValidateBody } from '../middlewares/validateBody.middleware';
import {
  registerBodySchema,
  userLoginBodySchema,
} from '../schemas/user.schemas';
import { UserController } from '../controllers/user.controller';
import { ValidateToken } from '../middlewares/validadeToken.middleware';

container.registerSingleton('UserServices', UserServices);
const userControllers = container.resolve('UserController') as UserController;
export const userRouter = Router();

userRouter.post('/', ValidateBody.execute(registerBodySchema), (req, res) => {
  userControllers.register(req, res);
});

userRouter.post(
  '/login',
  ValidateBody.execute(userLoginBodySchema),
  (req, res) => userControllers.login(req, res),
);

userRouter.get('/', ValidateToken.execute, (req, res) =>
  userControllers.getUser(req, res),
);

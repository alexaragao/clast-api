import { request, response, Router } from 'express';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const userController = new UserController();

userRouter.use(ensureAuthenticated);

userRouter.get('/', userController.show);
userRouter.put('/', userController.update);

export default userRouter;

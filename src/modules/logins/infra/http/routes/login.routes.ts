import { request, response, Router } from 'express';
import LoginRepository from '../../typeorm/repositories/LoginRepository';
import LoginsController from '../controllers/LoginsController';

const loginRouter = Router();
const loginsController = new LoginsController();

loginRouter.get('/', async (request, response) => {
  const { id } = request.body;

  const loginRepository = new LoginRepository();
  const logins = await loginRepository.findById(id);

  return response.json(logins);
});

loginRouter.post('/', loginsController.create)

export default loginRouter;

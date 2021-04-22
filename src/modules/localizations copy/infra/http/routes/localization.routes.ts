import { Router } from 'express';

import ensureAuthenticated from '../../../../logins/infra/http/middlewares/ensureAuthenticated';

import LocalizationsController from '../controllers/LocalizationsController';

const localizationRouter = Router();
const localizationsController = new LocalizationsController();

localizationRouter.use(ensureAuthenticated);

localizationRouter.post('/', localizationsController.create);

export default localizationRouter;

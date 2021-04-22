import { Router } from 'express';

import ensureAuthenticated from '../../../../logins/infra/http/middlewares/ensureAuthenticated';

import CurriculumsController from '../controllers/CurriculumsController';

const curriculumRouter = Router();
const curriculumsController = new CurriculumsController();

curriculumRouter.use(ensureAuthenticated);

curriculumRouter.post('/', curriculumsController.create);

export default curriculumRouter;

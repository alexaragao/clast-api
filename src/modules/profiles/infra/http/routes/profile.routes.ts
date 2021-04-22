import { Router } from 'express';

import ensureAuthenticated from '../../../../logins/infra/http/middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import ProfilesController from '../controllers/ProfilesController';
import ProfilePictureController from '../controllers/ProfilePictureController';

const profileRouter = Router();
const upload = multer(uploadConfig);
const profilesController = new ProfilesController();
const profilePictureController = new ProfilePictureController();

profileRouter.use(ensureAuthenticated);

// profileRouter.get('/', async (request, response) => {
//   const { login } = request.body;

//   const logins = await profileRepository.findByLogin(login);

//   return response.json(logins);
// });

profileRouter.post('/', upload.single('picture'), profilesController.create);

profileRouter.patch('/picture', upload.single('picture'), profilePictureController.update);

export default profileRouter;

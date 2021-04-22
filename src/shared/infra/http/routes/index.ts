import { Router } from 'express';
import loginRouter from '../../../../modules/logins/infra/http/routes/login.routes';
import profileRouter from '../../../../modules/profiles/infra/http/routes/profile.routes';
import sessionsRouter from '../../../../modules/logins/infra/http/routes/sessions.routes';
import passwordRouter from '../../../../modules/logins/infra/http/routes/password.routes';
import userRouter from '../../../../modules/logins/infra/http/routes/user.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/user', userRouter);

export default routes;

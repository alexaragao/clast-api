import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '../typeorm';
import '../../container';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../http/swagger_output.json';
import routes from '../http/routes';

const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3333);
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.maessage,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
//app.use('/api/v1', routes);

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}!`);
})

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

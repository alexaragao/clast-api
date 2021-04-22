import CreateLoginService from '../../../services/CreateLoginService';
import {Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class LoginsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password, term } = request.body;

    const createLogin = container.resolve(CreateLoginService);

    const loginCreated = await createLogin.execute({ login, password, term });

    return response.json(classToClass(loginCreated));
  }
}

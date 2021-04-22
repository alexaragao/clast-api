import ShowUserService from '../../../services/ShowUserService';
import UpdateLoginService from '../../../services/UpdateLoginService';
import {Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const login_id = request.user.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ login_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const login_id = request.user.id;
    const { login, old_password, password } = request.body;

    const updateLogin = container.resolve(UpdateLoginService);

    const loginCreated = await updateLogin.execute({
      login_id,
      login,
      old_password,
      password });

    return response.json(classToClass(loginCreated));
  }
}

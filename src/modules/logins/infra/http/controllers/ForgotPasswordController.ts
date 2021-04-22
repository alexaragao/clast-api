import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import {Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

   await sendForgotPasswordEmail.execute({ login });

    return response.status(204).json();
  }
}

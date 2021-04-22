import CreateProfileService from '../../../services/CreateProfileService';
import {Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfilesController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, lastName, CPF, Birthday,
      Facebook, LinkedIn, Instagram, Twitter, LoginID } = request.body;

    const createProfile = container.resolve(CreateProfileService);

    let Picture = request.file.filename;

    const profileCreated = await createProfile.execute({
      name, lastName, CPF, Birthday, Picture,
      Facebook, LinkedIn, Instagram, Twitter, LoginID
    });

    return response.json(profileCreated);
  }
}

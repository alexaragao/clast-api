import UpdateProfilePictureService from '../../../services/UpdateProfilePictureService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfilePictureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfilePicture = container.resolve(UpdateProfilePictureService);
    const profile = await updateProfilePicture.execute({
      LoginID: request.user.id,
      pictureFileName: request.file.filename
    })
    return response.json(profile);
  }
}

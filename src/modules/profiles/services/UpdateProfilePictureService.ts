import Profile from '../infra/typeorm/entities/Profile';
import AppError from '../../../shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProviders/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

interface IRequest {
  LoginID: string;
  pictureFileName: string;
}

@injectable()
class UpdateProfilePictureService {
  constructor(
    @inject('ProfileRepository')
    private profilesRepository: IProfilesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
    ){}

  public async execute({ LoginID, pictureFileName}: IRequest): Promise<Profile>{
    const profile = await this.profilesRepository.findByLogin(LoginID);

    if(!profile) {
      throw new AppError('Apenas usuarios autenticados podem mudar a foto', 401);
    }

    if(profile.Picture) {
      await this.storageProvider.deleteFile(profile.Picture);
    }

    const fileName = await this.storageProvider.saveFile(pictureFileName);

    profile.Picture = fileName;

    await this.profilesRepository.save(profile);

    return classToClass(profile);
  }
}

export default UpdateProfilePictureService;

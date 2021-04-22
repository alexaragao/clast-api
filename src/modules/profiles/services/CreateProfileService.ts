import { hash } from 'bcryptjs';
import Profile from '../infra/typeorm/entities/Profile';
import AppError from '../../../shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

interface IRequest {
  name: string;
  lastName: string;
  CPF: string;
  Birthday: Date;
  Picture: string;
  Facebook: string;
  LinkedIn: string;
  Instagram: string;
  Twitter: string;
  LoginID: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfileRepository')
    private profilesRepository: IProfilesRepository) { }

  public async execute({ name, lastName, CPF, Birthday, Picture,
    Facebook, LinkedIn, Instagram, Twitter, LoginID }: IRequest): Promise<Profile> {

    const checkLoginExists = await this.profilesRepository.findByLogin(LoginID);

    if (checkLoginExists) {
      throw new AppError('O Perfil informado já etá em uso');
    }

    const profileCreated = await this.profilesRepository.create({
      name,
      lastName,
      CPF,
      Birthday,
      Picture,
      Facebook,
      LinkedIn,
      Instagram,
      Twitter,
      LoginID
    });

    return classToClass(profileCreated);
  }
}

export default CreateProfileService;

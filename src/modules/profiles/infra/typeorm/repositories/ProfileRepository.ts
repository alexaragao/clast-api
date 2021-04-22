import Profile from '../../../infra/typeorm/entities/Profile';
import { getRepository, Repository } from 'typeorm';
import IProfilesRepository from '../../../repositories/IProfilesRepository';
import ICreateProfileDTO from '../../../dtos/ICreateProfileDTO';

class ProfileRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor(){
    this.ormRepository = getRepository(Profile);
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }

  public async findByLogin(loginId: string): Promise<Profile | undefined> {
    const user = await this.ormRepository.findOne({
      where: {LoginID: loginId}
    });

   return user;
  }

  public async create({name, lastName, CPF, Birthday, Picture,
    Facebook, LinkedIn, Instagram, Twitter, LoginID}: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create({ name, lastName, CPF, Birthday, Picture,
      Facebook, LinkedIn, Instagram, Twitter, LoginID });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async findProfiles(search: any): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}

export default ProfileRepository;

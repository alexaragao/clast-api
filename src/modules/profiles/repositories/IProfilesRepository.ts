import Profile from '../infra/typeorm/entities/Profile';
import ICreateProfileDTO from '../dtos/ICreateProfileDTO';

export default interface IProfilesRepository{
  create(data: ICreateProfileDTO): Promise<Profile>;
  save(profile: Profile): Promise<Profile>;
  findByLogin(loginId: string): Promise<Profile | undefined>;
  findProfiles(search: any): Promise<Profile | undefined>;
}

import { uuid } from 'uuidv4';
import ICreateProfileDTO from '../../dtos/ICreateProfileDTO';
import IProfilesRepository from '../IProfilesRepository';
import Profile from '../../infra/typeorm/entities/Profile';

class FakeProfileRepository implements IProfilesRepository {
  private profiles: Profile[] = [];

  public async create(data: ICreateProfileDTO): Promise<Profile> {
    const newProfile = new Profile();

    Object.assign(newProfile, { id: uuid() }, data);

    this.profiles.push(newProfile);

    return newProfile;
  }

  public async save(profile: Profile): Promise<Profile> {
    const findIndex = this.profiles.findIndex(l => l.id == profile.id);

    this.profiles[findIndex] = profile;

    return profile;
  }

  public async findByLogin(loginId: string): Promise<Profile | undefined> {
    const profile = this.profiles.find(profile => profile.LoginID === loginId);

    return profile;
  }

  public async findProfiles(search: any): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}

export default FakeProfileRepository;

import AppError from '../../../shared/errors/AppError';
import { uuid } from 'uuidv4';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import CreateProfileService from './CreateProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let createProfileService: CreateProfileService;

describe('CreateProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();
    createProfileService = new CreateProfileService(
      fakeProfilesRepository
    );
  })
  it('should be able to create new Profile', async () => {
    const loginId = uuid();

    const profile = await createProfileService.execute({
      name: 'John',
      lastName: 'Doe',
      CPF: '123456789',
      Birthday: new Date(1986, 8, 2, 19),
      Picture: '',
      Facebook: '',
      LinkedIn: '',
      Instagram: '',
      Twitter: '',
      LoginID: loginId
    });

    expect(profile).toHaveProperty('id');
  });

  it('should not be able to create new profile with same login from another', async () => {
    await createProfileService.execute({
      name: 'John',
      lastName: 'Doe',
      CPF: '123456789',
      Birthday: new Date(1986, 8, 2, 19),
      Picture: '',
      Facebook: '',
      LinkedIn: '',
      Instagram: '',
      Twitter: '',
      LoginID: '1'
    });

    expect(
      createProfileService.execute({
        name: 'John',
        lastName: 'Doe',
        CPF: '123456789',
        Birthday: new Date(1986, 8, 2, 19),
        Picture: '',
        Facebook: '',
        LinkedIn: '',
        Instagram: '',
        Twitter: '',
        LoginID: '1'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

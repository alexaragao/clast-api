import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateLoginService from './CreateLoginService';

let fakeLoginsRepository: FakeLoginsRepository;
let fakeHashProvider: FakeHashProvider;
let createLoginService: CreateLoginService;

describe('CreateLogin', () => {
  beforeEach(() => {
    fakeLoginsRepository = new FakeLoginsRepository();
    fakeHashProvider = new FakeHashProvider();
    createLoginService = new CreateLoginService(
      fakeLoginsRepository, fakeHashProvider
    );
  });
  it('should be able to create new login', async () => {
    const login = await createLoginService.execute({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    expect(login).toHaveProperty('id');
  });

  it('should not be able to create new login with same email from another', async () => {
    await createLoginService.execute({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    await expect(
      createLoginService.execute({
        login: 'a@a.com',
        password: '123456',
        term: true
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

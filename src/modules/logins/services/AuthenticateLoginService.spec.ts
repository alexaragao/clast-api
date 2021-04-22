import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateLoginService from './CreateLoginService';

let fakeLoginsRepository: FakeLoginsRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createLoginService: CreateLoginService;

describe('AuthenticateLogin', () => {
  beforeEach(() =>{
    fakeLoginsRepository = new FakeLoginsRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(fakeLoginsRepository, fakeHashProvider);
    createLoginService = new CreateLoginService(fakeLoginsRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const login = await createLoginService.execute({
      login: 'a@a.com',
      password: '123456',
      term: true
    })

    const response = await authenticateUserService.execute({
      login: 'a@a.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(login)
  });

  it('should not be able to authenticate with non existing login', async () => {
    expect(authenticateUserService.execute({
      login: 'a@a.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createLoginService.execute({
      login: 'a@a.com',
      password: '123456',
      term: true
    })

    await expect(authenticateUserService.execute({
      login: 'a@a.com',
      password: '456789',
    })).rejects.toBeInstanceOf(AppError);
  });
});

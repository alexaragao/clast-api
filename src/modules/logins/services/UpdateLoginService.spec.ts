import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateLoginService from './UpdateLoginService';
import CreateLoginService from './CreateLoginService';

let fakeLoginsRepository: FakeLoginsRepository;
let fakeHashProvider: FakeHashProvider;
let createLoginService: CreateLoginService;
let updateLoginService: UpdateLoginService;

describe('UpdateLogin', () => {
  beforeEach(() => {
    fakeLoginsRepository = new FakeLoginsRepository();
    fakeHashProvider = new FakeHashProvider();

    createLoginService = new CreateLoginService(
      fakeLoginsRepository, fakeHashProvider
    );

    updateLoginService = new UpdateLoginService(
      fakeLoginsRepository, fakeHashProvider
    );
  });

  it('should be able to update the login', async () => {
    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const updatedLogin = await updateLoginService.execute({
      login_id: login.id,
      login: 'b@a.com',
    });

    expect(updatedLogin.login).toBe('b@a.com');
  });

  it('should not be able update the user from non-existing user', async () => {
    expect( updateLoginService.execute({
      login_id: 'non-existing-user-id',
      login: 'a@a.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another login', async () => {
    await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const login = await fakeLoginsRepository.create({
      login: 'b@a.com',
      password: '123456',
      term: true
    });

    await expect(updateLoginService.execute({
      login_id: login.id,
      login: 'a@a.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const updatedLogin = await updateLoginService.execute({
      login_id: login.id,
      login: 'b@a.com',
      old_password: '123456',
      password: '789456',
    });

    expect(updatedLogin.password).toBe('789456');
  });

  it('should not be able to update the password without old password', async () => {
    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    await expect(updateLoginService.execute({
      login_id: login.id,
      login: 'b@a.com',
      password: '789456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    await expect(updateLoginService.execute({
      login_id: login.id,
      login: 'b@a.com',
      old_password: 'wrong-old-password',
      password: '789456',
    })).rejects.toBeInstanceOf(AppError);
  });
});

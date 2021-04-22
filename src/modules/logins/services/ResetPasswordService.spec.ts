import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeLoginsRepository: FakeLoginsRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeLoginsRepository = new FakeLoginsRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeLoginsRepository, fakeUserTokensRepository, fakeHashProvider
    );
  })

  it('should be able to reset the password', async () => {
    let user = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const loginToken = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token: loginToken.token,
      password: '12313'
    });

    user = await fakeLoginsRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('12313');
    expect(user.password).toBe('12313');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset the password if passed more than 2 hours', async () => {
    let user = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const loginToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPasswordService.execute({
      token: loginToken.token,
      password: '12313'
    })).rejects.toBeInstanceOf(AppError);
  });
});

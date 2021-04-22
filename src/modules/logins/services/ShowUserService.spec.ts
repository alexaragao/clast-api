import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateLoginService from './UpdateLoginService';
import CreateLoginService from './CreateLoginService';
import ShowUserService from './ShowUserService';

let fakeLoginsRepository: FakeLoginsRepository;
let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeLoginsRepository = new FakeLoginsRepository();

    showUserService = new ShowUserService(
      fakeLoginsRepository
    );
  });

  it('should be able show the user', async () => {
    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    const user = await showUserService.execute({
      login_id: login.id,
    });

    expect(user.login).toBe('a@a.com');
  });

  it('should not be able show the user from non-existing user', async () => {
    expect( showUserService.execute({
      login_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError);
  });
});

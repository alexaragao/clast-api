import AppError from '../../../shared/errors/AppError';
import FakeLoginsRepository from '../repositories/fakes/FakeLoginsRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeProfilesRepository from '../../profiles/repositories/fakes/FakeProfilesRepository';

let fakeLoginsRepository: FakeLoginsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeProfileRepository: FakeProfilesRepository;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeLoginsRepository = new FakeLoginsRepository();
    fakeMailProvider =  new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeProfileRepository = new FakeProfilesRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeLoginsRepository, fakeMailProvider, fakeUserTokensRepository, fakeProfileRepository
    );
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    await fakeProfileRepository.create({
      name: 'John',
      lastName: 'Doe',
      CPF: '123456789',
      Birthday: new Date(1986, 8, 2, 19),
      Picture: '',
      Facebook: '',
      LinkedIn: '',
      Instagram: '',
      Twitter: '',
      LoginID: login.id
    })

    await sendForgotPasswordEmail.execute({
      login: 'a@a.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing login password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      login: 'a@a.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const login = await fakeLoginsRepository.create({
      login: 'a@a.com',
      password: '123456',
      term: true
    });

    await fakeProfileRepository.create({
      name: 'John',
      lastName: 'Doe',
      CPF: '123456789',
      Birthday: new Date(1986, 8, 2, 19),
      Picture: '',
      Facebook: '',
      LinkedIn: '',
      Instagram: '',
      Twitter: '',
      LoginID: login.id
    })

    await sendForgotPasswordEmail.execute({
      login: 'a@a.com'
    });

    expect(generateToken).toHaveBeenCalledWith(login.id);
  });
});

import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import { injectable, inject } from 'tsyringe';
import IProfilesRepository from '../../profiles/repositories/IProfilesRepository';
import path from 'path';

interface IRequest {
  login: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('ProfileRepository')
    private profileRepository: IProfilesRepository,
  ){}

  public async execute({ login }: IRequest): Promise<void> {
    const user = await this.loginsRepository.findByEmail(login);

    if(!user) {
      throw new AppError('Login does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);
    const profile = await this.profileRepository.findByLogin(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
      );

    await this.mailProvider.sendMail({
      to: {
        name: profile.name,
        email: user.login
      },
      subject: '[Clast] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: profile.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }
}

export default SendForgotPasswordEmailService;

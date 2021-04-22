import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import { injectable, inject } from 'tsyringe';
import UserToken from '../infra/typeorm/entities/UserToken';
import Login from '../infra/typeorm/entities/Login';

interface IRequest {
  login_id: string;
  login: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateLoginService {
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ login_id, login, old_password, password }: IRequest): Promise<Login> {
    const user = await this.loginsRepository.findById(login_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.loginsRepository.findByEmail(login);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id != login_id) {
      throw new AppError('E-mail already in use.');
    }

    user.login = login;

    if (password && !old_password) {
      throw new AppError('You need to inform the old password to set a new password.')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não está correta.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return await this.loginsRepository.save(user);
  }
}

export default UpdateLoginService;

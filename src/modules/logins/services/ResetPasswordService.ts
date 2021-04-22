import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';
import { compare } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.loginsRepository.findById(userToken.user_id);

    if(!user)
    {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.loginsRepository.save(user);
  }
}

export default ResetPasswordService;

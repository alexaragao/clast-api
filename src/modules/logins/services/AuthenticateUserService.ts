import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Login from '../infra/typeorm/entities/Login';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse{
  user: Login;
  token: string;
}

@injectable()
class AuthenticateUserService{
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ){}

  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.loginsRepository.findByEmail(login);

    if(!user) {
      throw new AppError('Combinação de login/password está incorreta.');
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    delete user.password;

    if(!passwordMatched){
      throw new AppError('Combinação de login/password está incorreta.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.id;

    return { user, token };
  }
}

export default AuthenticateUserService;

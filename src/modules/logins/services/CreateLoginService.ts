import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import { injectable, inject } from 'tsyringe';
import Login from '../infra/typeorm/entities/Login';

interface IRequest {
  login: string;
  password: string;
  term: boolean;
}

@injectable()
class CreateLoginService {
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({ login, password, term }: IRequest): Promise<Login> {
    const checkLoginExists = await this.loginsRepository.findByEmail(login);

    if(checkLoginExists) {
      throw new AppError('O Login informado já etá em uso');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const loginCreated = await this.loginsRepository.create({
      login,
      password: hashedPassword,
      term
    });

    return loginCreated;
  }
}

export default CreateLoginService;

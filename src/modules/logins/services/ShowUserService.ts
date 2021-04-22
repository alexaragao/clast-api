import AppError from '../../../shared/errors/AppError';
import ILoginsRepository from '../repositories/ILoginsRepository';
import { injectable, inject } from 'tsyringe';
import Login from '../infra/typeorm/entities/Login';

interface IRequest {
  login_id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('LoginRepository')
    private loginsRepository: ILoginsRepository,
  ) { }

  public async execute({ login_id }: IRequest): Promise<Login> {
    const user = await this.loginsRepository.findById(login_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowUserService;

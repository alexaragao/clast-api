import ICreateLoginDTO from '../../../dtos/ICreateLoginDTO';
import Login from '../entities/Login';
import ILoginRepository from '../../../repositories/ILoginsRepository';
import { getRepository, Repository } from 'typeorm';

class LoginRepository implements ILoginRepository {
  private ormRepository: Repository<Login>;

  constructor(){
    this.ormRepository = getRepository(Login);
  }

  public async findById(id: string): Promise<Login | undefined> {
   const login = await this.ormRepository.findOne(id);

   return login;
  }

  public async findByEmail(login: string): Promise<Login | undefined> {
    const user = await this.ormRepository.findOne({
      where: {login}
    });

   return user;
  }

  public async create({ login, password, term }: ICreateLoginDTO): Promise<Login> {
    const profile = this.ormRepository.create({ login, password, term });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(login: Login): Promise<Login> {
    return this.ormRepository.save(login);
  }
}

export default LoginRepository;

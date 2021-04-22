import { uuid } from 'uuidv4';
import ICreateLoginDTO from '../../dtos/ICreateLoginDTO';
import ILoginRepository from '../../repositories/ILoginsRepository';
import Login from '../../infra/typeorm/entities/Login';

class FakeLoginRepository implements ILoginRepository {
  private logins: Login[] = [];

  public async findById(id: string): Promise<Login | undefined> {
    const login = this.logins.find(login => login.id === id);

    return login;
  }

  public async findByEmail(login: string): Promise<Login | undefined> {
    const findLogin = this.logins.find(l => l.login === login);

    return findLogin;
  }

  public async create({ login, password, term }: ICreateLoginDTO): Promise<Login> {
    const newLogin = new Login();

    Object.assign(newLogin, { id: uuid(), login, password, term });

    this.logins.push(newLogin);

    return newLogin;
  }

  public async save(login: Login): Promise<Login> {
    const findIndex = this.logins.findIndex(l => l.id == login.id);

    this.logins[findIndex] = login;

    return login;
  }
}

export default FakeLoginRepository;

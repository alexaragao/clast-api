import ICreateLoginDTO from "../dtos/ICreateLoginDTO";
import Login from "../infra/typeorm/entities/Login";

export default interface ILoginRepository {
  findById(id: string): Promise<Login | undefined>;
  findByEmail(login: string): Promise<Login | undefined>;
  create(data: ICreateLoginDTO): Promise<Login>;
  save(login: Login): Promise<Login>;
}

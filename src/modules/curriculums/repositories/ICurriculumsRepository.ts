import ICreateCurriculumDTO from "../dtos/ICreateCurriculumDTO";
import Curriculum from "../infra/typeorm/entities/Curriculum";

export default interface ICurriculumRepository {
  findById(id: string): Promise<Curriculum | undefined>;
  create(data: ICreateCurriculumDTO): Promise<Curriculum>;
  findByLogin(loginId: string): Promise<Curriculum | undefined>;
  save(login: Curriculum): Promise<Curriculum>;
}

import Curriculum from '../entities/Curriculum';
import { getRepository, Repository } from 'typeorm';
import ICurriculumsRepository from '../../../repositories/ICurriculumsRepository';
import ICreateCurriculumDTO from '../../../dtos/ICreateCurriculumDTO';

class CurriculumRepository implements ICurriculumsRepository {
  private ormRepository: Repository<Curriculum>;

  constructor() {
    this.ormRepository = getRepository(Curriculum);
  }

  public async save(profile: Curriculum): Promise<Curriculum> {
    return this.ormRepository.save(profile);
  }

  public async findById(id: string): Promise<Curriculum | undefined> {
    const curriculum = await this.ormRepository.findOne({
      where: { id: id },
    });

    return curriculum;
  }

  public async findByLogin(loginId: string): Promise<Curriculum | undefined> {
    const user = await this.ormRepository.findOne({
      where: { LoginID: loginId },
    });

    return user;
  }

  public async create({
    City,
    Country,
    State,
    LoginID,
  }: ICreateCurriculumDTO): Promise<Curriculum> {
    const profile = this.ormRepository.create({
      Country,
      City,
      State,
      LoginID,
    });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async findCurriculums(search: any): Promise<Curriculum[]> {
    // TODO: Parse 'search' param to filter results
    const curriculums = await this.ormRepository.find();

    return curriculums;
  }
}

export default CurriculumRepository;

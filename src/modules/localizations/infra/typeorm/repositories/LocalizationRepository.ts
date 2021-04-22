import Localization from '../entities/Localization';
import { getRepository, Repository } from 'typeorm';
import ILocalizationsRepository from '../../../repositories/ILocalizationsRepository';
import ICreateLocalizationDTO from '../../../dtos/ICreateLocalizationDTO';

class LocalizationRepository implements ILocalizationsRepository {
  private ormRepository: Repository<Localization>;

  constructor() {
    this.ormRepository = getRepository(Localization);
  }

  public async save(profile: Localization): Promise<Localization> {
    return this.ormRepository.save(profile);
  }

  public async findById(id: string): Promise<Localization | undefined> {
    const localization = await this.ormRepository.findOne({
      where: { id: id },
    });

    return localization;
  }

  public async findByLogin(loginId: string): Promise<Localization | undefined> {
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
  }: ICreateLocalizationDTO): Promise<Localization> {
    const profile = this.ormRepository.create({
      Country,
      City,
      State,
      LoginID,
    });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async findLocalizations(search: any): Promise<Localization[]> {
    // TODO: Parse 'search' param to filter results
    const localizations = await this.ormRepository.find();

    return localizations;
  }
}

export default LocalizationRepository;

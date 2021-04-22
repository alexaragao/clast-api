import ICreateLocalizationDTO from "../dtos/ICreateLocalizationDTO";
import Localization from "../infra/typeorm/entities/Localization";

export default interface ILocalizationRepository {
  findById(id: string): Promise<Localization | undefined>;
  create(data: ICreateLocalizationDTO): Promise<Localization>;
  findByLogin(loginId: string): Promise<Localization | undefined>;
  save(login: Localization): Promise<Localization>;
}

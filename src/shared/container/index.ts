import { container } from 'tsyringe';

import '../../modules/logins/providers';
import './providers';

import ILoginsRepository from '../../modules/logins/repositories/ILoginsRepository';
import LoginRepository from '../../modules/logins/infra/typeorm/repositories/LoginRepository';

import IProfilesRepository from '../../modules/profiles/repositories/IProfilesRepository';
import ProfileRepository from '../../modules/profiles/infra/typeorm/repositories/ProfileRepository';
import IUserTokensRepository from '../../modules/logins/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/logins/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IProfilesRepository>(
  'ProfileRepository',
  ProfileRepository
);

container.registerSingleton<ILoginsRepository>(
  'LoginRepository',
  LoginRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

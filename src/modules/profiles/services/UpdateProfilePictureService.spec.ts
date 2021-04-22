import AppError from '../../../shared/errors/AppError';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import FakeStorageProvider from '../../../shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateProfilePictureService from './UpdateProfilePictureService';

let fakeProfilesRepository: FakeProfilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateProfilePictureService: UpdateProfilePictureService;

describe('UpdateProfilePicture', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateProfilePictureService = new UpdateProfilePictureService(
      fakeProfilesRepository, fakeStorageProvider
    );
  });
  it('should be able to update picture from specific profile', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'John',
      lastName: 'Doe',
      Birthday: new Date(),
      CPF: '123456789',
      Facebook: '',
      Instagram: '',
      LinkedIn: '',
      LoginID: '1',
      Picture: '',
      Twitter: ''
    })

    await updateProfilePictureService.execute({
      LoginID: profile.LoginID,
      pictureFileName: 'picture.jpg'
    });

    expect(profile.Picture).toBe('picture.jpg');
  });

  it('should not be able to update picture from non existing profile', async () => {
    await expect(updateProfilePictureService.execute({
      LoginID: 'non-existing-login',
      pictureFileName: 'picture.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const profile = await fakeProfilesRepository.create({
      name: 'John',
      lastName: 'Doe',
      Birthday: new Date(),
      CPF: '123456789',
      Facebook: '',
      Instagram: '',
      LinkedIn: '',
      LoginID: '1',
      Picture: '',
      Twitter: ''
    })

    await updateProfilePictureService.execute({
      LoginID: profile.LoginID,
      pictureFileName: 'old_picture.jpg'
    });

    await updateProfilePictureService.execute({
      LoginID: profile.LoginID,
      pictureFileName: 'picture.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('old_picture.jpg');
    expect(profile.Picture).toBe('picture.jpg');
  });
});

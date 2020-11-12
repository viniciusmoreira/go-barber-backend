import AppError from '@shared/errors/AppError';
import FakeUsersRepositoriy from '../repositories/fakes/FakeUsersRepositoriy';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepositoriy: FakeUsersRepositoriy;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepositoriy = new FakeUsersRepositoriy();

    showProfile = new ShowProfileService(fakeUsersRepositoriy);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('User');
    expect(profile.email).toBe('user@user.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepositoriy from '../repositories/fakes/FakeUsersRepositoriy';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepositoriy: FakeUsersRepositoriy;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepositoriy = new FakeUsersRepositoriy();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepositoriy,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User Updated',
      email: 'userupdated@user.com',
    });

    expect(updatedUser.name).toBe('User Updated');
    expect(updatedUser.email).toBe('userupdated@user.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'userupdated@user.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User Updated',
        email: 'user@user.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User',
      email: 'user@user.com',
      old_password: '123456',
      password: '654321',
    });

    expect(updatedUser.password).toBe('654321');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User',
        email: 'user@user.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepositoriy.create({
      name: 'User',
      email: 'user@user.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User',
        email: 'user@user.com',
        old_password: '654321',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

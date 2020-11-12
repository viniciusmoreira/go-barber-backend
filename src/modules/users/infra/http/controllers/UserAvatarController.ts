import { Request, Response } from 'express';
import UpdateUseUpdateUserAvatarServicerAvatar from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;
    const updateUserAvatar = container.resolve(
      UpdateUseUpdateUserAvatarServicerAvatar,
    );
    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });

    return response.json(classToClass(user));
  }
}

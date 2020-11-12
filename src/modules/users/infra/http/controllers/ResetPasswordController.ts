import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const restPassword = container.resolve(ResetPasswordService);

    await restPassword.execute({ password, token });

    return response.status(204).json();
  }
}

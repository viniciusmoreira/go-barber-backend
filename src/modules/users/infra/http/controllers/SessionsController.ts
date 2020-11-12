import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSessions = container.resolve(AuthenticateUserService);
    const { user, token } = await createSessions.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}

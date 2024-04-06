import { inject, injectable } from 'tsyringe';
import { UserServices } from '../services/user.service';
import { Request, Response } from 'express';

@injectable()
export class UserController {
  constructor(@inject('UserServices') private userServices: UserServices) {}

  async register(req: Request, res: Response): Promise<Response> {
    const user = await this.userServices.register(req.body);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const user = await this.userServices.login(req.body);
    return res.status(200).json(user);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals.decode;
    const user = await this.userServices.getUser(Number(id));
    return res.status(200).json(user);
  }
}

import { injectable } from 'tsyringe';
import {
  TUserLoginBody,
  TUserLoginReturn,
  TUserRegisterBody,
  TUserReturn,
  userReturnSchema,
} from '../schemas/user.schemas';
import bcrypt from 'bcrypt';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/appError';
import jwt from 'jsonwebtoken';
@injectable()
export class UserServices {
  async register(body: TUserRegisterBody): Promise<TUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: hashPassword,
    };
    const user = await prisma.user.create({ data: newUser });
    return userReturnSchema.parse(user);
  }

  async login(body: TUserLoginBody): Promise<TUserLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email } });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    const comparePassword = await bcrypt.compare(body.password, user.password);

    if (!comparePassword) {
      throw new AppError(401, 'Incorrect email or password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return { accessToken: token, user: userReturnSchema.parse(user) };
  }

  async getUser(id: number): Promise<TUserReturn> {
    const user = await prisma.user.findFirst({ where: { id } });
    return userReturnSchema.parse(user);
  }
}

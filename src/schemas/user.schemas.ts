import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export const registerBodySchema = userSchema.omit({ id: true });

export const userLoginBodySchema = registerBodySchema.omit({ name: true });

export const userReturnSchema = userSchema.omit({ password: true });

export type TUser = z.infer<typeof userSchema>;

export type TUserRegisterBody = z.infer<typeof registerBodySchema>;

export type TUserLoginBody = z.infer<typeof userLoginBodySchema>;

export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserLoginReturn = {
  accessToken: string;
  user: TUserReturn;
};

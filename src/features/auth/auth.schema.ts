import { z } from 'zod';

const userSchema = z.object({
  id: z.string().min(1),
  email: z.email(),
  name: z.string().min(1),
});

const loginInputSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1),
});

const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  tokenType: z.literal('Bearer'),
  expiresIn: z.number().int().positive(),
  user: userSchema,
});

const logoutResponseSchema = z.object({
  loggedOut: z.literal(true),
});

type User = z.infer<typeof userSchema>;
type LoginInput = z.infer<typeof loginInputSchema>;
type LoginResponse = z.infer<typeof loginResponseSchema>;

export {
  userSchema,
  loginInputSchema,
  loginResponseSchema,
  logoutResponseSchema,
};

export type { User, LoginInput, LoginResponse };

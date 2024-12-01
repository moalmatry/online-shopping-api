import { z } from 'zod';

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email or password'),
    password: z
      .string({
        required_error: 'Invalid email or password',
      })
      .min(6, 'Invalid email or password'),
  }),
});

export type CreateLoginInput = z.infer<typeof createSessionSchema>['body'];

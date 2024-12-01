import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password is too short - should be min 6 characters'),
      passwordConfirmation: z.string({
        required_error: 'Please confirm your password',
      }),
      email: z.string({ required_error: 'Email is required' }).email('Not valid email address'),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

export const verifyUserSchema = z.object({
  params: z.object({
    id: z.string(),
    verificationCode: z.string(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not valid email address'),
  }),
});

export const resetPasswordSchema = z.object({
  params: z.object({
    id: z.string(),
    passwordResetCode: z.string(),
  }),
  body: z
    .object({
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password is too short - should be min 6 characters'),
      passwordConfirmation: z.string({
        required_error: 'Please confirm your password',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

export const updatePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z
        .string({ required_error: 'Please enter current password' })
        .min(6, 'Password is too short - should be min 6 characters'),
      newPassword: z
        .string({ required_error: 'Please enter current password' })
        .min(6, 'Password is too short - should be min 6 characters'),
      confirmNewPassword: z
        .string({ required_error: 'Please enter current password' })
        .min(6, 'Password is too short - should be min 6 characters'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Password don't match",
      path: ['passwordConfirmation'],
    }),
});

const Gender = ['MALE', 'FEMALE'] as const;
export const updateMeSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email('Not valid email address').optional(),
    phoneNumber: z
      .string()
      .refine(
        (val) => {
          const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
          return phoneRegex.test(val);
        },
        {
          message: 'Invalid phone number format',
        },
      )
      .optional(),
    gender: z.enum(Gender).optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
});

const Role = ['USER', 'ADMIN', 'EMPLOYEE'] as const;
export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email('Not valid email address'),
    fullAddress: z.string().min(20, 'Address must be at least 20 characters').optional(),
    phoneNumber: z
      .string()
      .refine(
        (val) => {
          const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
          return phoneRegex.test(val);
        },
        {
          message: 'Invalid phone number format',
        },
      )
      .optional(),
    gender: z.enum(Gender).optional(),
    verified: z.boolean().optional(),
    role: z.enum(Role).optional(),
    active: z.boolean().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
});

export const restoreUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

export const deleteUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

export const getAllUsersSchema = z.object({
  query: z.object({
    index: z.string().min(1).optional(),
    limit: z.string().min(1).optional(),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = z.TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = z.TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = z.TypeOf<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.TypeOf<typeof updatePasswordSchema>['body'];
export type UpdateMeInput = z.TypeOf<typeof updateMeSchema>['body'];
export type RestoreUserInput = z.TypeOf<typeof restoreUserSchema>['body'];
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>['body'];
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>['body'];
export type GetAllUsersInput = z.TypeOf<typeof getAllUsersSchema>['query'];

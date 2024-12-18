import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category should be least 5 characters'),
    name: z
      .string({ required_error: 'Please enter category name' })
      .min(5, 'category should be least 5 characters')
      .optional(),
    image: z.string({ required_error: 'Please enter category image' }).nullable().optional(),
  }),
});

export const deleteCategorySchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category id should be least 5 characters'),
  }),
});

export const categoryByNameSchema = z.object({
  params: z.object({
    name: z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
  }),
});

export const categoryByIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter category id' }).min(5, 'category id should be least 5 characters'),
  }),
});

export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>['body'];
export type UpdateCategoryInput = z.TypeOf<typeof updateCategorySchema>['body'];
export type DeleteCategoryInput = z.TypeOf<typeof deleteCategorySchema>['body'];
export type CategoryByNameInput = z.TypeOf<typeof categoryByNameSchema>['params'];
export type CategoryByIdInput = z.TypeOf<typeof categoryByIdSchema>['params'];

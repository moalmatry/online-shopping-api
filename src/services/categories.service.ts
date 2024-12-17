import { db } from '../db';

/** @description return all categories  */
export const getCategories = async (products: boolean) => {
  const allCategories = await db.category.findMany({
    include: {
      products,
    },
  });

  return allCategories;
};

export const createCategory = async (name: string) => {
  const newCategory = await db.category.create({
    data: {
      name,
    },
  });

  return newCategory;
};

export const updateCategory = async (name: string, newName: string) => {
  const updatedCategory = await db.category.update({
    where: {
      name,
    },
    data: {
      name: newName,
    },
  });

  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await db.category.delete({
    where: {
      id,
    },
  });

  return deletedCategory;
};

export const findCategoryByName = async (name: string) => {
  const category = await db.category.findFirst({
    where: {
      name,
    },
    include: {
      products: true,
    },
  });
  return category;
};

export const findCategoryById = async (id: string) => {
  const category = await db.category.findFirst({
    where: {
      id,
    },
    include: {
      products: false,
    },
  });

  return category;
};

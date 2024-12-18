import { db } from '../db';
import { ProductDataProps, UpdateProductProps } from '../types';

export const getAllProducts = async () => {
  const allProducts = db.product.findMany({});

  return allProducts;
};

export const findProductById = async (id: string) => {
  // const products = db.product.findMany({
  //   where: {
  //     OR: [{ name: { contains: name, mode: 'insensitive' } }],
  //     // { description: { contains: name, mode: 'insensitive' } }
  //   },
  // });

  const products = db.product.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      tags: true,
      categoryName: true,
      variants: true,
    },
  });

  return products;
};

export const createNewProduct = async (productData: ProductDataProps) => {
  const { categoryName, description, name, tags, variants } = productData;
  const newProduct = await db.product.create({
    data: {
      name,
      description,
      categoryName,
      tags,
      variants: {
        create: [...variants],
      },
    },
    select: {
      name: true,
      description: true,
    },
  });

  return newProduct;
};

export const updateProduct = async (updateProduct: UpdateProductProps) => {
  const { id, name, description, categoryName, tags } = updateProduct;
  const updatedProduct = await db.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      tags,
      categoryName,
    },
  });

  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const deletedProduct = await db.product.delete({
    where: {
      id,
    },
  });

  return deletedProduct;
};

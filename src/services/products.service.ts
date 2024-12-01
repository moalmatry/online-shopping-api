import { db } from '../db';
import { ProductDataProps, UpdateDataProps } from '../types';

export const getAllProducts = async () => {
  const allProducts = db.product.findMany({});

  return allProducts;
};

export const findProductByName = async (name: string) => {
  const products = db.product.findMany({
    where: {
      OR: [{ name: { contains: name, mode: 'insensitive' } }],
      // { description: { contains: name, mode: 'insensitive' } }
    },
  });

  return products;
};

export const createNewProduct = async (productData: ProductDataProps) => {
  const newProduct = await db.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      categoryName: productData.categoryName,
      price: productData.price,
      images: productData.images,
      tags: productData.tags,
    },
  });

  return newProduct;
};

export const updateProduct = async (updateProduct: UpdateDataProps) => {
  const { id, price, categoryName, description, images, name, tags } = updateProduct;
  const updatedProduct = await db.product.update({
    where: {
      id,
    },
    data: {
      price,
      categoryName,
      description,
      images,
      name,
      tags,
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

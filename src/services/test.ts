import { db } from '../db';

async function createProduct() {
  const newProduct = await db.product.create({
    data: {
      id: '1', // Replace with your own UUID generation logic if necessary
      name: 'Sample Product',
      description: 'This is a sample product.',
      tags: ['sample', 'product'],
      categoryName: 'Electronics', // Ensure this category exists in your Category table
      variants: {
        create: [
          {
            id: '1',
            name: 'Half ', // Replace with your own UUID generation logic if necessary
            price: 99.99,
            images: ['sample-image-url'],
            description: 'Sample variant',
            available: true,
            quantity: 10,
          },
        ],
      },
      orderProducts: {
        connect: [], // Provide connection logic if necessary
      },
      CartProduct: {
        connect: [], // Provide connection logic if necessary
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Product created:', newProduct);
}

createProduct()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });

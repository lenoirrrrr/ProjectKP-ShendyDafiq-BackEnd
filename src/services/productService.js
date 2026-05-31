import prisma from '../config/prisma.js';

export const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count()
  ]);
  return { products, total };
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const createProduct = async (data) => {
  return await prisma.product.create({
    data
  });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id }
  });
};

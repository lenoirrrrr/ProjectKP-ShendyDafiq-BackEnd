import prisma from '../config/prisma.js';

export const getAllCategories = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.category.count()
  ]);
  return { categories, total };
};

export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id }
  });
};

export const createCategory = async (data) => {
  return await prisma.category.create({
    data
  });
};

export const updateCategory = async (id, data) => {
  return await prisma.category.update({
    where: { id },
    data
  });
};

export const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: { id }
  });
};

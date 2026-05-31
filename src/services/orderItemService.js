import prisma from '../config/prisma.js';

export const getAllOrderItems = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [orderItems, total] = await Promise.all([
    prisma.orderItem.findMany({
      skip,
      take: limit,
      include: { product: true, order: true }
    }),
    prisma.orderItem.count()
  ]);
  return { orderItems, total };
};

export const getOrderItemById = async (id) => {
  return await prisma.orderItem.findUnique({
    where: { id },
    include: { product: true, order: true }
  });
};

export const createOrderItem = async (data) => {
  return await prisma.orderItem.create({
    data
  });
};

export const updateOrderItem = async (id, data) => {
  return await prisma.orderItem.update({
    where: { id },
    data
  });
};

export const deleteOrderItem = async (id) => {
  return await prisma.orderItem.delete({
    where: { id }
  });
};

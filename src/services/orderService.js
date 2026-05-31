import prisma from '../config/prisma.js';

export const getAllOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.order.count()
  ]);
  return { orders, total };
};

export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
};

export const createOrder = async (customerName, items) => {
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItemsData = [];

    // Process each item to calculate total and verify stock
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Deduct stock
      await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity }
      });

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create the order with its items
    const order = await tx.order.create({
      data: {
        customerName,
        totalAmount,
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    return order;
  });
};

export const updateOrder = async (id, data) => {
  return await prisma.order.update({
    where: { id },
    data
  });
};

export const deleteOrder = async (id) => {
  return await prisma.order.delete({
    where: { id }
  });
};

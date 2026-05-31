import prisma from '../config/prisma.js';

export const getAllAdmins = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [admins, total] = await Promise.all([
    prisma.admin.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.admin.count()
  ]);
  
  return { admins, total };
};

export const getAdminById = async (id) => {
  return await prisma.admin.findUnique({
    where: { id }
  });
};

export const createAdmin = async (data) => {
  return await prisma.admin.create({
    data
  });
};

export const updateAdmin = async (id, data) => {
  return await prisma.admin.update({
    where: { id },
    data
  });
};

export const deleteAdmin = async (id) => {
  return await prisma.admin.delete({
    where: { id }
  });
};

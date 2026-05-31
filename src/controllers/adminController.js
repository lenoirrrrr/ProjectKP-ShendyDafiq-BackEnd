import * as adminService from '../services/adminService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllAdmins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { admins, total } = await adminService.getAllAdmins(page, limit);
    
    successResponse(res, admins, 'Admins retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminService.getAdminById(id);
    if (!admin) return errorResponse(res, new Error('Admin not found'), 404);
    successResponse(res, admin, 'Admin retrieved successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createAdmin = async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    successResponse(res, admin, 'Admin created successfully', 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminService.updateAdmin(id, req.body);
    successResponse(res, admin, 'Admin updated successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.deleteAdmin(id);
    successResponse(res, null, 'Admin deleted successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

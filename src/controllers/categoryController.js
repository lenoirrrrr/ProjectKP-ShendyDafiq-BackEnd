import * as categoryService from '../services/categoryService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { categories, total } = await categoryService.getAllCategories(page, limit);
    
    successResponse(res, categories, 'Categories retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) return errorResponse(res, new Error('Category not found'), 404);
    successResponse(res, category, 'Category retrieved successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    successResponse(res, category, 'Category created successfully', 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    successResponse(res, category, 'Category updated successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    successResponse(res, null, 'Category deleted successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

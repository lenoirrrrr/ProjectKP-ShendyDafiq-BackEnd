import * as productService from '../services/productService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { products, total } = await productService.getAllProducts(page, limit);
    
    successResponse(res, products, 'Products retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) return errorResponse(res, new Error('Product not found'), 404);
    successResponse(res, product, 'Product retrieved successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    // Basic validation
    if (req.body.price < 0) return errorResponse(res, new Error('Price cannot be negative'), 400);
    if (req.body.stock < 0) return errorResponse(res, new Error('Stock cannot be negative'), 400);
    
    // Map categoryId to category, removing empty strings
    if (req.body.categoryId !== undefined) {
      req.body.category = req.body.categoryId === "" ? null : req.body.categoryId;
      delete req.body.categoryId;
    } else if (req.body.category === "") {
      req.body.category = null;
    }

    // Map image to imageUrl if frontend sends 'image' instead of 'imageUrl'
    if (req.body.image !== undefined) {
      req.body.imageUrl = req.body.image;
      delete req.body.image;
    }
    
    const product = await productService.createProduct(req.body);
    successResponse(res, product, 'Product created successfully', 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Map categoryId to category, removing empty strings
    if (req.body.categoryId !== undefined) {
      req.body.category = req.body.categoryId === "" ? null : req.body.categoryId;
      delete req.body.categoryId;
    } else if (req.body.category === "") {
      req.body.category = null;
    }

    // Map image to imageUrl if frontend sends 'image' instead of 'imageUrl'
    if (req.body.image !== undefined) {
      req.body.imageUrl = req.body.image;
      delete req.body.image;
    }

    const product = await productService.updateProduct(id, req.body);
    successResponse(res, product, 'Product updated successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    successResponse(res, null, 'Product deleted successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

import * as orderItemService from '../services/orderItemService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllOrderItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { orderItems, total } = await orderItemService.getAllOrderItems(page, limit);
    
    successResponse(res, orderItems, 'Order Items retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await orderItemService.getOrderItemById(id);
    if (!orderItem) return errorResponse(res, new Error('OrderItem not found'), 404);
    successResponse(res, orderItem, 'Order Item retrieved successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createOrderItem = async (req, res) => {
  try {
    const orderItem = await orderItemService.createOrderItem(req.body);
    successResponse(res, orderItem, 'Order Item created successfully', 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await orderItemService.updateOrderItem(id, req.body);
    successResponse(res, orderItem, 'Order Item updated successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    await orderItemService.deleteOrderItem(id);
    successResponse(res, null, 'Order Item deleted successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

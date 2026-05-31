import * as orderService from '../services/orderService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { orders, total } = await orderService.getAllOrders(page, limit);
    
    successResponse(res, orders, 'Orders retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    if (!order) return errorResponse(res, new Error('Order not found'), 404);
    successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;
    if (!customerName) {
      return errorResponse(res, new Error('Customer name is required'), 400);
    }
    if (!items || items.length === 0) {
      return errorResponse(res, new Error('Order must contain at least one item'), 400);
    }
    
    const order = await orderService.createOrder(customerName, items);
    successResponse(res, order, 'Order created successfully', 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.updateOrder(id, req.body);
    successResponse(res, order, 'Order updated successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await orderService.deleteOrder(id);
    successResponse(res, null, 'Order deleted successfully');
  } catch (error) {
    errorResponse(res, error);
  }
};

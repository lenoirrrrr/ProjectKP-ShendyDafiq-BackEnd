// Helper to format success response
export const successResponse = (res, data, message = 'Success', statusCode = 200, meta = undefined) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

// Helper to format error response
export const errorResponse = (res, error, statusCode = 500) => {
  // Check for Prisma specific errors if needed
  let message = error.message || 'Internal Server Error';
  
  if (error.code === 'P2002') {
    statusCode = 400;
    message = `Unique constraint failed on the field: ${error.meta?.target}`;
  } else if (error.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  });
};

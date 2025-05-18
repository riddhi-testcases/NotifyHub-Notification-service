export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log detailed error info (in production, you'd use a proper logging system)
  console.error({
    status,
    message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });
  
  // Send response to client
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};
function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  
  const message = err.message || 'Erro interno do servidor';

  console.error(`[Erro] ${statusCode}: ${message}`);
  if (statusCode === 500) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: message
  });
}

export default errorMiddleware;
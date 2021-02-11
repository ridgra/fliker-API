const errorTypes = {
  NotFound: 404,
};

const errorMessages = {
  NotFound: 'Not Found',
};

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message:
      statusCode === 500
        ? 'internal server error'
        : errorMessages[error.name] || error.message,
    errors: error.errors || undefined,
  });
}

module.exports = {
  notFound,
  errorHandler,
};

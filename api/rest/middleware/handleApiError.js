const ApiError = require('../utils/ApiError');

const handleApiError = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.code).json({
      message: error.message,
    });
  }

  next(error);
};

module.exports = handleApiError;

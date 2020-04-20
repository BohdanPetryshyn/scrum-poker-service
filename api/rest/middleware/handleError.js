const handleError = (error, req, res, next) => {
  return res.status(500).json({
    message: error.message,
  });
};

module.exports = handleError;

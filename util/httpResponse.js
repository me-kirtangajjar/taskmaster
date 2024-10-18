module.exports = (
  req,
  res,
  responseStatusCode,
  responseMessage,
  data = null
) => {
  const response = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data: data,
  };

  res.status(responseStatusCode).json(response);
};

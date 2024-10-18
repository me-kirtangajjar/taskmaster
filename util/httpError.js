module.exports = (next, err, req, errorStatusCode = 500) => {
  const errObj = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error
        ? err.message || responseMessage.SOMETHING_WENT_WRONG
        : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null,
  };

  return next(errObj);
};

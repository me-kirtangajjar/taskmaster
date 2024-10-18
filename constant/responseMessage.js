module.exports = {
  SUCCESS: `The operation has been successful`,
  SOMETHING_WENT_WRONG: `Something went wrong!`,
  NOT_FOUND: (entity) => `${entity} not found`,
  TOO_MANY_REQUESTS: `Too many requests! Please try again after some time`,
  INVALID_CREDENTIALS: `Invalid credentials`,
  ALREADY_EXISTS: (entity, identifier) =>
    `${entity} already exists with ${identifier}`,
  UNAUTHORIZED: `You are not authorized to perform the operation`,
  FORBIDDEN: `Forbidden`,
  EXPIRED_TOKEN: `Expired token`,
};

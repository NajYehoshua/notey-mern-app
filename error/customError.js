//! CustomError class
class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}

//! create a new CustomError object
const createCustomError = (msg, statusCode) => {
  return new CustomError(msg, statusCode);
};

module.exports = {
  CustomError,
  createCustomError,
};

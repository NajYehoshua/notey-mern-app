const CustomError = require("../error/customError");

const customErrorHandler = (err, req, res) => {
  //! check err is a instance of the customerror
  if (err instanceof CustomError) {
    //! return a response call
    return res.status(err.statusCode).send(err.message);
  }

  //! default response call
  res.status(500).send("Something went wrong!");
};

module.exports = customErrorHandler;

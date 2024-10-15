const { z } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      let errorMessages = [];

      for (err of error.errors) {
        errorMessages.push(`${err.path[0]} : ${err.message.toLocaleLowerCase()}`);
      }

      res.status(400).json({
        message: errorMessages.join(", "),
      });
    }
  };
};

module.exports = { validate };

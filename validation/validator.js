import { validationResult, body } from "express-validator";

// a middleware checking if there any issue
const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  } else {
    res.status(400).send({ errors: validationErrors.array() });
  }
};

const photoValidator = [
  body("title")
    .notEmpty()
    .withMessage(" Title should be not empty")
    .isAlpha("de-DE")
    .isLength({ min: 5, max: 15 })
    .withMessage("the length isnt correct!"),
  body(""),
];

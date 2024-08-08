import { body, validationResult } from "express-validator";
const validate = (validates) => {
    return async (req, res, next) => {
        for (let validation of validates) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(404).json({ errors: errors.array() });
    };
};
const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").trim().isLength({ min: 8 }).withMessage("Password must have atleast 8 characters")
];
const signUpvalidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator
];
export { signUpvalidator, validate, loginValidator };
//# sourceMappingURL=validator.js.map
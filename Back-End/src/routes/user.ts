import { Router } from "express";
import { getUsers, userSignUp, userLogin } from "../controllers/user-controller.js";
import { validate, signUpvalidator, loginValidator } from "../utils/validator.js"

const userRoutes = Router();

userRoutes.get("/" , getUsers);
userRoutes.post("/signup", validate(signUpvalidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
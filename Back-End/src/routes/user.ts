import { Router } from "express";
import { getUsers, userSignUp, userLogin, verifyUser, userLogout } from "../controllers/user-controller.js";
import { validate, signUpvalidator, loginValidator } from "../utils/validator.js"
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/" , getUsers);
userRoutes.post("/signup", validate(signUpvalidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
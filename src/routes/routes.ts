import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

const api = Router().use("/user", userController).use("/auth", authController);

export default Router().use("/api", api);

import { Router } from "express";
import userController from "../controllers/user.controller";

const api = Router().use("/user", userController);

export default Router().use("/api", api);

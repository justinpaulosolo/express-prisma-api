import { Router, Request, Response, NextFunction } from "express";
import { authJwt, authLocal, registerUser } from "../services/auth.service";

const router = Router();

/**
 * Register a new user
 * @route {POST} /auth/register
 * @bodyparam user User
 * @returns user.id
 * */
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await registerUser(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Register a new user
 * @route {POST} /auth/login
 * @bodyparam
 * @returns user.id , user.email, user.token
 * */
router.post(
  "/login",
  authLocal,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("login --->", req);
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Test protected route
 * @route {GET} /auth/protected
 * @headerparam Authorization Bearer <token>
 * @returns user
 * */
router.get(
  "/protected",
  authJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

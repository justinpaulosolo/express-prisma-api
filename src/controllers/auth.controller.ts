import { Router, Request, Response, NextFunction } from "express";
import { registerUser } from "../services/auth.service";

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

export default router;

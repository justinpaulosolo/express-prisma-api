import { NextFunction, Router, Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../services/users";

const router = Router();

/**
 * Create a new user
 * @route {POST} /user
 * @bodyparam user User
 * @returns user.id
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * Update a new user
 * @route {PUT} /user
 * @bodyparam user User
 * @returns user.id
 */
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await updateUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * Create all users
 * @route {GET} /user
 * @bodyparam
 * @returns user[] User
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a user by id
 * @route {GET} /user
 * @bodyparam id int
 * @returns user[] User
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const users = await getUserById(id);
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a user by id
 * @route {DELETE} /user
 * @bodyparam id int
 * @returns user[] User
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const userId = await deleteUser(id);
    return res.json(userId);
  } catch (err) {
    next(err);
  }
});

export default router;

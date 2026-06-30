import { Router } from "express";
import {
  getUserById,
  updateUser,
  updateUserPassword,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.patch("/:id/password", updateUserPassword);

export default router;

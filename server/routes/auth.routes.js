import { Router } from "express";
import { login, recoverPassword, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/recover-password", recoverPassword);

export default router;

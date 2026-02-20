import { Router } from "express";
import {
  createUser,
  deleteUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user";
import auth from "../middlewares/auth";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);
router.get("/cabinet", auth, getCurrentUser);
router.patch("/cabinet/settings", auth, updateUser);
router.delete("/cabinet/settings/delete", auth, deleteUser);

export default router;

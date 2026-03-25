import { Router } from "express";
import {
  addToUserColldection,
  createUser,
  deleteUser,
  getCurrentUser,
  getUserCollection,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user";
import auth from "../middlewares/auth";
import optionalAuth from "../middlewares/optionalAuth";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);
router.post("/collection/add", optionalAuth, addToUserColldection)
router.post("/logout", auth, logoutUser);
router.get("/cabinet", auth, getCurrentUser);
router.get('/getCollection/:id', optionalAuth, getUserCollection);
router.patch("/cabinet/settings", auth, updateUser);
router.delete("/cabinet/settings/delete", auth, deleteUser);

export default router;

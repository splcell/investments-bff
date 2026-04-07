import { Router } from "express";
import {
  addToUserColldection,
  createUser,
  deleteFromUserCollection,
  deleteUser,
  getCurrentUser,
  getFullUserCollection,
  getUserCollection,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user";
import auth from "../middlewares/auth";
import optionalAuth from "../middlewares/optionalAuth";
import cacheMiddleware from "../middlewares/cache-middleware";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);
router.post("/collection/add", optionalAuth, addToUserColldection)
router.post("/logout", auth, logoutUser);
router.get("/cabinet/user", auth, getCurrentUser);
router.get('/getCollection/:id', optionalAuth, getUserCollection);
router.get('/fullCollection/:id', auth, getFullUserCollection)
router.patch("/cabinet/settings", auth, updateUser);
router.delete("/cabinet/settings/delete", auth, deleteUser);
router.delete("/collection/delete", optionalAuth, deleteFromUserCollection)

export default router;

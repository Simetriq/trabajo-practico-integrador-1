import express from "express";
import {
  deleteUser,
  GetAllUsers,
  getUserId,
  updateUser,
} from "../controllers/user.controller.js";
import {
  deleteUserValidation,
  getUserByPkValidation,
  updateUserValidation,
} from "../middleware/validations/user.validator.js";
import validations from "../middleware/validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const routesUser = express.Router();

routesUser.get("/user", authMiddleware, adminMiddleware, GetAllUsers);
routesUser.get("/user/:id", getUserByPkValidation, validations, getUserId);
routesUser.put("/user/:id", updateUserValidation, validations, updateUser);
routesUser.delete("/user/:id", deleteUserValidation, validations, deleteUser);

export default routesUser;

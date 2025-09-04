import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  createRegisterValidation,
  updateProfileValidation,
} from "../middleware/validations/auth.validation.js";

import validations from "../middleware/validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { dataValidada } from "../middleware/matched_data.middleware.js";

export const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  createRegisterValidation,
  validations,
  dataValidada,
  register
);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", logout);

authRoutes.get("/auth/profile", authMiddleware, getProfile);

authRoutes.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidation,
  validations,
  dataValidada,
  updateProfile
);

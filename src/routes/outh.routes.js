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
} from "../middlewares/validations/auth.validation.js";

import validation from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { dataValidada } from "../middlewares/matched_data.middleware.js";

export const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  createRegisterValidation,
  validation,
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
  validation,
  dataValidada,
  updateProfile
);

import express from "express";
import {
  deleteProfile,
  getAllProfiles,
  getProfile,
  postProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import {
  createProfileValidation,
  deleteProfileValidation,
  getProfileByPkValidation,
  updateProfileValidation,
} from "../middleware/validations/profile.validator.js";
import validations from "../middleware/validator.js";

const routesProfile = express.Router();

routesProfile.post(
  "/profile",
  createProfileValidation,
  validations,
  postProfile
);
routesProfile.get("/profile", getAllProfiles);
routesProfile.get(
  "/profile/:id",
  getProfileByPkValidation,
  validations,
  getProfile
);
routesProfile.put(
  "/profile/:id",
  updateProfileValidation,
  validations,
  updateProfile
);
routesProfile.delete(
  "/profile/:id",
  deleteProfileValidation,
  validations,
  deleteProfile
);

export default routesProfile;

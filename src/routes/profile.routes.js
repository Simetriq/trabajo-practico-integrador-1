import express from "express";
import {
  deleteProfile,
  getAllProfiles,
  getProfile,
  postProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const routesProfile = express.Router();

routesProfile.post("/profile", postProfile);
routesProfile.get("/profile", getProfile);
routesProfile.get("/profile/:id", getAllProfiles);
routesProfile.put("/profile/:id", deleteProfile);
routesProfile.delete("/profile/:id", updateProfile);

export default routesProfile;

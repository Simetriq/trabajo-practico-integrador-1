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
routesProfile.get("/profile", getAllProfiles);
routesProfile.get("/profile/:id", getProfile);
routesProfile.put("/profile/:id", updateProfile);
routesProfile.delete("/profile/:id", deleteProfile);

export default routesProfile;

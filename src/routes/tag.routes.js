import express from "express";
import {
  deleteTag,
  getAllTags,
  getTag,
  postTag,
  updateTag,
} from "../controllers/tag.controller.js";

const routesTag = express.Router();

routesTag.post("/tag", postTag);
routesTag.get("/tag", getAllTags);
routesTag.get("/tag/:id", getTag);
routesTag.put("/tag/:id", updateTag);
routesTag.delete("/tag/:id", deleteTag);

export default routesTag;

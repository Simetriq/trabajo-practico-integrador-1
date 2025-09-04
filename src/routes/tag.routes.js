import express from "express";
import {
  deleteTag,
  getAllTags,
  getTag,
  postTag,
  updateTag,
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  deleteTagValidation,
  getTagByPkValidation,
  updateTagValidation,
} from "../middleware/validations/tag.validator.js";
import validations from "../middleware/validator.js";

const routesTag = express.Router();

routesTag.post("/tag", createTagValidation, validations, postTag);
routesTag.get("/tag", getTagByPkValidation, validations, getAllTags);
routesTag.get("/tag/:id", getTag);
routesTag.put("/tag/:id", updateTagValidation, validations, updateTag);
routesTag.delete("/tag/:id", deleteTagValidation, validations, deleteTag);

export default routesTag;

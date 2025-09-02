import express from "express";
import {
  deleteArticleTag,
  getAllArticleTags,
  getArticleTag,
  postArticleTag,
  updateArticleTag,
} from "../controllers/articleTag.controller.js";
import {
  createArticleTagValidation,
  getByPkArticleTagValidation,
} from "../middleware/validations/article_tag.validator.js";
import validations from "../middleware/validator.js";

const routesArticleTag = express.Router();

routesArticleTag.post(
  "/user",
  createArticleTagValidation,
  validations,
  postArticleTag
);
routesArticleTag.get("/user", getAllArticleTags);
routesArticleTag.get(
  "/user/:id",
  getByPkArticleTagValidation,
  validations,
  getArticleTag
);
routesArticleTag.put(
  "/user/:id",
  updateArticleTag,
  validations,
  updateArticleTag
);
routesArticleTag.delete(
  "/user/:id",
  deleteArticleTag,
  validations,
  deleteArticleTag
);

export default routesArticleTag;

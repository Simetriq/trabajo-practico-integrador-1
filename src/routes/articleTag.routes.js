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

import { authMiddleware } from "../middleware/auth.middleware.js";
import { ownerMiddleware } from "../middleware/owner.middleware.js";

const routesArticleTag = express.Router();

routesArticleTag.post(
  "/articletag",
  authMiddleware,
  createArticleTagValidation,
  validations,
  postArticleTag
);

routesArticleTag.get("/articletag", authMiddleware, getAllArticleTags);

routesArticleTag.get(
  "/articletag/:id",
  authMiddleware,
  getByPkArticleTagValidation,
  validations,
  ownerMiddleware,
  getArticleTag
);

routesArticleTag.put(
  "/articletag/:id",
  authMiddleware,
  createArticleTagValidation,
  validations,
  ownerMiddleware,
  updateArticleTag
);

routesArticleTag.delete(
  "/articletag/:id",
  authMiddleware,
  getByPkArticleTagValidation,
  validations,
  ownerMiddleware,
  deleteArticleTag
);

export default routesArticleTag;

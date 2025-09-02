import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js";

const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    // timestamps: false,
  }
);

export default ArticleTagModel;

ArticleTagModel.belongsTo(UserModel, { foreignKey: "user_model_id" });
ArticleTagModel.belongsTo(ArticleTagModel, { foreignKey: "ArticleTag_id" });

UserModel.hasMany(ArticleTagModel, { foreignKey: "user_model_id" });
ArticleTagModel.hasMany(ArticleTagModel, { foreignKey: "ArticleTag_id" });

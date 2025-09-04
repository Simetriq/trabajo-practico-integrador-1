import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js";

const ProfileModel = sequelize.define(
  "profile",
  {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    // timestamps: false,
  }
);

export default ProfileModel;

ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

UserModel.hasOne(ProfileModel, { foreignKey: "profile" });

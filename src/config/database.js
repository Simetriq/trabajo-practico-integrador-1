import { Sequelize } from "sequelize";

const sequelize = new Sequelizelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: localhost,
    dialect: mysql,
  }
);

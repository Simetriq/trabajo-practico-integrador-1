import sequelize from "./database.js";

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("La coneccion se establecio correctamente.");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
};

export default testDB;

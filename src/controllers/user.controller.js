import UserModel from "../models/user.model.js";

export const postUser = async (req, res) => {
  try {
    const crearUnUsuario = await UserModel.create(req.body);
    return res.status(200).json(crearUnUsuario);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de crear un usuario" });
  }
};
export const GetAllUsers = async (req, res) => {
  try {
    const GetUsers = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          as: "tasks",
        },
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });
    return res.status(200).json(GetUsers);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error al tratar de traer todos los usuarios" });
  }
};
export const getUserId = async (req, res) => {
  try {
    const findUserId = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          attributes: { exclude: ["user_id", "id"] },
        },
        {
          model: ProfileModel,
        },
      ],
    });
    return res.status(200).json(findUserId);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de traer un usuario por id" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const [updateUserById] = await UserModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (updateUserById) {
      const userActualizado = await TaskModel.findById(req.params.id);
      return res.status(200).json(userActualizado);
    } else {
      return res.status(404).json({
        message: `No se encontro el usuario que se quiere actualizar`,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de actualizar un usuario" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.destroy({
      where: { id: req.params.id },
    });
    return res
      .status(204)
      .json({ message: "Se elimino correctamente el usuario" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de borrar un usuario" });
  }
};

import ProfileModel from "../models/profile.model.js";

export const postProfile = async (req, res) => {
  try {
    const CrearUnPerfil = await ProfileModel.create(req.body);
    return res.status(200).json(CrearUnPerfil);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error al tratar de crear un perfil" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const findProfileById = await ProfileModel.findByPk(req.params.id);
    return res.status(200).json(findProfileById);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de traer un perfil" });
  }
};
export const getAllProfiles = async (req, res) => {
  try {
    const traerTodo = await ProfileModel.findAll({
      attributes: { exclude: ["user_id"] },
      include: [{ model: UserModel, attributes: { exclude: ["password"] } }],
    });
    return res.status(200).json(traerTodo);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de traer un perfil" });
  }
};
export const deleteProfile = async (req, res) => {
  try {
    const deleteProfileById = await ProfileModel.destroy({
      where: { id: req.params.id },
    });
    if (deleteProfileById)
      return res
        .status(200)
        .json({ message: "El perfil se a eliminado correctamente" });
    else {
      return res
        .status(400)
        .json({ message: "Error al tratar de eliminar un perfil" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de eliminar un perfil" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const [updateProfileById] = await ProfileModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateProfileById) {
      const profileActualizado = await ProfileModel.findByPk(req.params.id);
      return res.status(200).json(profileActualizado);
    } else {
      return res.status(404).json({
        message: `No se encontro el perfil que se quiere actualizar`,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error en la peticion de actualizacion de perfil" });
  }
};

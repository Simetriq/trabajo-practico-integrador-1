import { generateToken } from "../helpers/jwt.helper.js";
import ProfileModel from "../models/profile.model.js";
import UserModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
  try {
    const data = req.data;

    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    await ProfileModel.create({
      user_id: user.id,
      first_name: data.first_name,
      last_name: data.last_name,
      biography: data.biography,
      avatar_url: data.avatar_url,
      birth_date: data.birth_date,
    });

    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    where: { username },
    include: {
      model: ProfileModel,
      attributes: ["first_name", "last_name"],
      as: "profile",
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "password inválidas" });
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
    first_name: user.profile.first_name,
    last_name: user.profile.last_name,
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  return res.json({ message: "Login exitoso" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout exitoso" });
};

export const getProfile = async (req, res) => {
  try {
    const perfil = await ProfileModel.findByPk(req.user.id, {
      include: {
        model: UserModel,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    });
    if (!perfil)
      return res.status(404).json({ message: "El perfil no encontrado" });
    return res.status(200).json(perfil);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = req.data;

    const perfil = await ProfileModel.findByPk(req.user.id);
    if (!perfil)
      return res.status(404).json({ message: "El perfil no encontrado" });

    await perfil.update({
      first_name: data.first_name,
      last_name: data.last_name,
      biography: data.biography,
      avatar_url: data.avatar_url,
      birth_date: data.birth_date,
      user_id: req.user_id,
    });
    return res.json({
      message: "Perfil actualizado correctamente",
      perfil,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

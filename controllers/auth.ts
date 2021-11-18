import User from "../models/user";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../utils/generateToken";

const createUser = async (
  email: string,
  password: string,
  name: string,
  avatar?: string
): Promise<any> => {
  const userExists = await User.query().where("email", email);

  if (userExists.length > 0)
    throw "User already created with this email address.";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.query().insert({
    email,
    password: hashedPassword,
    name,
    avatar,
  });

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    avatar: newUser.avatar,
  };
};

const getUser = async (emailToCheck: string, passwordToCheck: string) => {
  const user = await User.query().where("email", emailToCheck).first();

  if (!user) throw "Either your email or password is incorrect.";

  const validPassword = await bcrypt.compare(passwordToCheck, user.password);
  if (!validPassword) throw "Either your email or password is incorrect.";

  const { id, email, name, avatar } = user;

  return {
    id,
    email,
    name,
    avatar,
  };
};

const updateUserRefreshToken = async (id: number, refreshToken: string) => {
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw "Refresh token cryptography failed.";

  const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
  if (!hashedRefreshToken) throw "Refresh token creation failed.";

  const user = await User.query().patchAndFetchById(id, {
    refreshToken: hashedRefreshToken,
  });
  if (!user) throw "User not found for refresh token.";

  return user;
};

const checkUserRefreshToken = async (id: number, refreshToken: string) => {
  if (!refreshToken) throw "No token provided.";
  const user = await User.query().findById(id);

  const { email, name, avatar, refreshToken: jti } = user;
  if (!jti) throw "No JTI stored.";

  const verifiedToken = verifyRefreshToken(refreshToken);
  if (!verifiedToken) throw "Token not valid.";

  const matchingToken = await bcrypt.compare(verifiedToken.jti, jti);
  if (!matchingToken) throw "Token signature invalid.";

  return generateAccessToken({
    id,
    email,
    name,
    avatar,
    refreshToken: verifiedToken,
  });
};

export { createUser, getUser, updateUserRefreshToken, checkUserRefreshToken };

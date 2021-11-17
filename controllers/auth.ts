import User from "../models/user";
import bcrypt from "bcrypt";

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

export { createUser, getUser };

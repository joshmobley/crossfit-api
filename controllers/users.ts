import User from "../models/user";

const getUsers = async (): Promise<Array<User>> => {
  const users = await User.query();
  return users;
};

const getUser = async (id: number): Promise<User> => {
  const user = await User.query().findById(id);
  return user;
};

const createUser = async (
  email: string,
  password: string,
  name: string,
  avatar?: string
): Promise<User> => {
  const userExists = await User.query().where("email", email);

  if (userExists.length > 0)
    throw "User already created with this email address.";

  const newUser = await User.query().insert({
    email,
    password,
    name,
    avatar,
  });
  return newUser;
};

const updateUser = async (
  id: number,
  email?: string,
  password?: string,
  name?: string,
  avatar?: string
): Promise<User> => {
  const updatedUser = await User.query().findById(id).patchAndFetch({
    email,
    password,
    name,
    avatar,
  });
  return updatedUser;
};

const deleteUser = async (id: number, user_id: number): Promise<number> => {
  if (user_id !== id) throw "user is not permitted to take this action";
  const deletedUser = await User.query().deleteById(id);
  return deletedUser;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

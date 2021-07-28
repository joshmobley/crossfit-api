import User from "../models/user";

const getUsers = async (): Promise<Array<User>> => {
  const users = await User.query().select(
    "id",
    "name",
    "email",
    "avatar",
    "created_at",
    "updated_at"
  );
  return users;
};

const getUser = async (id: number): Promise<User> => {
  const user = await User.query()
    .select("id", "name", "email", "avatar", "created_at", "updated_at")
    .findById(id);
  return user;
};

const updateUser = async (
  id: number,
  email?: string,
  password?: string,
  name?: string,
  avatar?: string
): Promise<User> => {
  const updatedUser = await User.query().patchAndFetchById(id, {
    email,
    password,
    name,
    avatar,
  });

  delete updatedUser.password;

  return updatedUser;
};

const deleteUser = async (id: number, user_id: number): Promise<number> => {
  if (user_id !== id) throw "user is not permitted to take this action";
  const deletedUser = await User.query().deleteById(id);
  return deletedUser;
};

export { getUsers, getUser, updateUser, deleteUser };

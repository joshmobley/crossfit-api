import User from "../models/user";

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

export { createUser };

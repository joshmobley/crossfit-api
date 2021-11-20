import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import { updateUserRefreshToken } from "../controllers/auth";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      ...user,
      jti: uuid(),
    },
    "thisIsSecret",
    { expiresIn: "1h" }
  );
};

const generateIDToken = (user) => {
  return jwt.sign(
    {
      ...user,
      jti: uuid(),
    },
    "thisIsOneMoreSecret",
    { expiresIn: "12h" }
  );
};

const generateRefreshToken = async ({ id }) => {
  const jti = uuid();
  const token = jwt.sign(
    {
      jti,
    },
    "thisIsAnotherSecret",
    {
      expiresIn: "14d",
    }
  );

  await updateUserRefreshToken(id, jti);
  return token;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, "thisIsSecret", (err, decoded) => {
    if (err) throw "Token is invalid";
    return decoded;
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, "thisIsAnotherSecret", (err, decoded) => {
    if (err) throw "Token is invalid";
    return decoded;
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  generateIDToken,
  verifyAccessToken,
  verifyRefreshToken,
};

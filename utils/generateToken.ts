import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import { updateUserRefreshToken } from "../controllers/auth";

const generateAccessToken = (tokenContents) => {
  return jwt.sign(
    {
      ...tokenContents,
      jti: uuid(),
    },
    "thisIsSecret",
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = async (user) => {
  const jti = uuid();
  const token = jwt.sign(
    {
      ...user,
      jti,
    },
    "thisIsAnotherSecret",
    {
      expiresIn: "14d",
    }
  );

  await updateUserRefreshToken(user.id, jti);
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
  verifyAccessToken,
  verifyRefreshToken,
};

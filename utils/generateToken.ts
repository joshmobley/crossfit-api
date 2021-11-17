import jwt from "jsonwebtoken";

const generateAccessToken = (tokenContents) => {
  return jwt.sign(tokenContents, "thisIsSecret", { expiresIn: "15m" });
};

const generateRefreshToken = (tokenContents) => {
  return jwt.sign(tokenContents, "thisIsAnotherSecret", { expiresIn: "14d" });
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

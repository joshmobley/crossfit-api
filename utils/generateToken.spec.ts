import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./generateToken";

describe("generateAccessToken", () => {
  it("returns a token", () => {
    const token = generateAccessToken({
      id: "test",
    });
    expect(token).toBeTruthy();
  });
});

describe("generateRefreshToken", () => {
  it("returns a token", () => {
    const token = generateRefreshToken({
      id: "test",
    });
    expect(token).toBeTruthy();
  });
});

describe("verifyAccessToken", () => {
  it("returns a valid token", () => {
    const token = generateAccessToken({
      id: "test",
    });
    const unwrapped = verifyAccessToken(token);
    const { id, exp, iat } = unwrapped;
    expect(id).toBe("test");
    expect(exp - iat).toBe(900);
  });

  it("does not return an invalid token", () => {
    const token = generateRefreshToken({
      id: "test",
    });
    expect(() => verifyAccessToken(token)).toThrow("Token is invalid");
  });
});

describe("verifyRefreshToken", () => {
  it("returns a valid token", () => {
    const token = generateRefreshToken({
      id: "test",
    });
    const unwrapped = verifyRefreshToken(token);
    const { id, exp, iat } = unwrapped;
    expect(id).toBe("test");
    expect(exp - iat).toBe(1209600);
  });

  it("does not return an invalid token", () => {
    const token = generateAccessToken({
      id: "test",
    });
    expect(() => verifyRefreshToken(token)).toThrow("Token is invalid");
  });
});

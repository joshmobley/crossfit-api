import { checkAccessToken } from "./authorization";
import { mockRequest, mockResponse } from "jest-mock-req-res";
import { generateAccessToken } from "../utils/generateToken";

const next = jest.fn();

describe("checkAccessToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns next when token is valid", () => {
    const token = generateAccessToken({
      id: "test",
    });
    checkAccessToken(
      mockRequest({
        headers: {
          "x-access-token": token,
        },
      }),
      mockResponse(),
      next
    );
    expect(next).toHaveBeenCalled();
  });

  it("returns 403 when no token is provide", () => {
    const result = checkAccessToken(mockRequest(), mockResponse(), next);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when token is not valid", () => {
    checkAccessToken(
      mockRequest({
        headers: {
          "x-access-token": "badtoken",
        },
      }),
      mockResponse(),
      next
    );
    expect(next).not.toHaveBeenCalled();
  });
});

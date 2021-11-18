import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateRefreshToken } from "../../utils/generateToken";

const email = "test@testuser.com";
const name = "Test User";
const avatar = "//placehold.it/123x123";
const password = "mypassword";

describe("POST /refresh - refresh a users access token", () => {
  it("returns 403 when no refresh token is provided", async () => {
    await request(app)
      .post("/auth/refresh")
      .then((res) => {
        expect(res.status).to.equal(403);
      });
  });

  it("returns 403 when no bad token is provided", async () => {
    await request(app)
      .post("/auth/refresh")
      .send({
        email,
        name,
        avatar,
        password,
      })
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });
});

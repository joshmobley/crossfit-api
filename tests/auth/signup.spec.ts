import app from "../../app";
import { expect } from "chai";
import request from "supertest";

const email = "test@testuser.com";
const name = "Test User";
const avatar = "//placehold.it/123x123";
const password = "mypassword";

describe("POST /signup - create a user", () => {
  it("returns a user without being logged in", async () => {
    await request(app)
      .post("/auth/signup")
      .send({
        email,
        name,
        avatar,
        password,
      })
      .then((res) => {
        expect(res.body.email).equals(email);
        expect(res.body.name).equals(name);
        expect(res.body.avatar).equals(avatar);
        expect(res.body.id).to.exist;
      });
  });

  it("cannot create a new user with duplicate email", async () => {
    await request(app)
      .post("/auth/signup")
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

import app from "../../app";
import { expect } from "chai";
import request from "supertest";

const name = "Josh Mobley";
const email = "jmob1986@gmail.com";
const password = "test123";
const avatar = "//placehold.it/300x300";

describe("POST /login - login a user", () => {
  it("returns a user when successful", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        email,
        password,
      })
      .then((res) => {
        expect(res.body.name).equals(name);
        expect(res.body.avatar).equals(avatar);
        expect(res.body.id).to.exist;
        expect(res.body.accessToken).to.exist;
      });
  });

  it("returns 403 when bad email", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        email: "bad@email.com",
        password,
      })
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("returns 403 when bad password", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "badpassword",
      })
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });
});

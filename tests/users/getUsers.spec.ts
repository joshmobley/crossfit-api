import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("GET / - get all users", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/users")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("returns list of users", async () => {
    await request(app)
      .get("/users")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.body.length).equals(2);
      });
  });
});

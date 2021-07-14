import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("GET / - get all scores", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/scores")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("returns list of scores", async () => {
    await request(app)
      .get("/scores")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.body.length).equals(2);
      });
  });
});

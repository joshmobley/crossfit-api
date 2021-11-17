import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("GET / - get all scores", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/scores")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("returns list of scores", async () => {
    await request(app)
      .get("/scores")
      .set("x-access-token", token)
      .expect(200)
      .then((res) => {
        expect(res.body.length).equals(2);
      });
  });
});

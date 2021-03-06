import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("GET /:id - get one user", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/users/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("return one user", async () => {
    await request(app)
      .get("/users/1")
      .set("x-access-token", token)
      .expect(200)
      .then((res) => {
        const { id, name, email, avatar, password, created_at, updated_at } =
          res.body;
        expect(id).equals(1);
        expect(name).equals("Josh Mobley");
        expect(email).equals("jmob1986@gmail.com");
        expect(avatar).equals("//placehold.it/300x300");
        expect(password).to.not.exist;
        expect(created_at).to.exist;
        expect(updated_at).to.exist;
      });
  });
});

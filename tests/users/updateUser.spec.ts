import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("PATCH /:id - update score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .patch("/users/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("cannot update another user", async () => {
    const name = "Updated Name";
    const email = "updated@email.com";

    await request(app)
      .patch("/users/2")
      .set("Authorization", "Bearer " + auth.token)
      .send({
        name,
        email,
      })
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("can update a user", async () => {
    const name = "Updated Name";
    const email = "updated@email.com";

    await request(app)
      .patch("/users/1")
      .set("Authorization", "Bearer " + auth.token)
      .send({
        name,
        email,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.name).equals(name);
        expect(res.body.email).equals(email);
        expect(res.body.id).to.exist;
        expect(res.body.created_at).to.exist;
        expect(res.body.updated_at).to.exist;
        expect(res.body.avatar).to.exist;
      });
  });
});

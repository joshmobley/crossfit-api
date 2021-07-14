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
      .patch("/scores/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("successful score update", async () => {
    const value = "Testing score Updated";
    const comment = "I am testing score update.";

    await request(app)
      .patch("/scores/1")
      .set("Authorization", "Bearer " + auth.token)
      .send({
        value,
        comment,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.value).equals(value);
        expect(res.body.comment).equals(comment);
        expect(res.body.post_id).equals(1);
        expect(res.body.user_id).equals(1);
        expect(res.body.id).to.exist;
        expect(res.body.created_at).to.exist;
      });
  });
});

import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("PATCH /:id - update score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .patch("/scores/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("successful score update", async () => {
    const value = "Testing score Updated";
    const comment = "I am testing score update.";

    await request(app)
      .patch("/scores/1")
      .set("x-access-token", token)
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

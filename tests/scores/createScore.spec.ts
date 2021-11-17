import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("POST / - create score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .post("/scores")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("successful score creation", async () => {
    const post_id = 1;
    const value = "1000";
    const comment = "my comment on my new post";

    await request(app)
      .post("/scores")
      .set("x-access-token", token)
      .send({
        post_id,
        value,
        comment,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.post_id).equals(post_id);
        expect(res.body.value).equals(value);
        expect(res.body.comment).equals(comment);
        expect(res.body.user_id).equals(1);
        expect(res.body.id).to.exist;
        expect(res.body.created_at).to.exist;
      });
  });
});

import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("POST / - create post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .post("/posts")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("successful post creation", async () => {
    const title = "Testing Post Create";
    const text = "I am testing post create.";
    const scoretype = "time";

    await request(app)
      .post("/posts")
      .set("x-access-token", token)
      .send({
        title,
        text,
        scoretype,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.title).equals(title);
        expect(res.body.text).equals(text);
        expect(res.body.scoretype).equals(scoretype);
        expect(res.body.user_id).equals(1);
        expect(res.body.id).to.exist;
        expect(res.body.created_at).to.exist;
      });
  });
});

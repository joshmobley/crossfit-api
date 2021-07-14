import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("POST / - create post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .post("/posts")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("successful post creation", async () => {
    const title = "Testing Post Create";
    const text = "I am testing post create.";
    const scoretype = "time";

    await request(app)
      .post("/posts")
      .set("Authorization", "Bearer " + auth.token)
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

import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("GET /:id/scores - get scores by post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/posts/1/scores")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("return one post's scores", async () => {
    await request(app)
      .get("/posts/1/scores")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.body.length).equals(2);
        const [score] = res.body;
        const {
          id,
          user_id,
          post_id,
          value,
          comment,
          created_at,
          updated_at,
          score_user_name,
          score_user_avatar,
        } = score;

        expect(id).equals(1);
        expect(user_id).equals(1);
        expect(post_id).equals(1);
        expect(value).equals("40");
        expect(comment).equals("That was hard!");
        expect(created_at).to.exist;
        expect(updated_at).to.exist;
        expect(score_user_name).equals("Josh Mobley");
        expect(score_user_avatar).equals("//placehold.it/300x300");
      });
  });
});

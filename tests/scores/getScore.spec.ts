import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("GET /:id - get one score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/scores/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("return one score", async () => {
    await request(app)
      .get("/scores/1")
      .set("x-access-token", token)
      .expect(200)
      .then((res) => {
        const {
          id,
          user_id,
          post_id,
          value,
          comment,
          created_at,
          updated_at,
          score_post_title,
          score_user_name,
          score_user_avatar,
        } = res.body;

        expect(value).equals("40");
        expect(user_id).equals(1);
        expect(post_id).equals(1);
        expect(comment).equals("That was hard!");
        expect(score_post_title).equals("Testing Post Updated");
        expect(score_user_name).equals("Josh Mobley");
        expect(score_user_avatar).equals("//placehold.it/300x300");
        expect(id).to.exist;
        expect(created_at).to.exist;
        expect(updated_at).to.exist;
      });
  });
});

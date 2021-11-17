import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("GET /:id - get one post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .get("/posts/1")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("return one post", async () => {
    await request(app)
      .get("/posts/1")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        const {
          title,
          user_id,
          image_url,
          scoretype,
          post_user_name,
          post_user_avatar,
          created_at,
          updated_at,
          id,
        } = res.body;

        expect(title).equals("Grippy 15 min AMRAP");
        expect(user_id).equals(1);
        expect(image_url).equals("//placehold.it/800x600");
        expect(scoretype).equals("amrap");
        expect(post_user_name).equals("Josh Mobley");
        expect(post_user_avatar).equals("//placehold.it/300x300");
        expect(id).to.exist;
        expect(created_at).to.exist;
        expect(updated_at).to.exist;
      });
  });
});

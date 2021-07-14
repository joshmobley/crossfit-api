import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("DELETE /:id - delete a post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .delete("/posts/3")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("cannot delete another users post", async () => {
    await request(app)
      .delete("/posts/2")
      .set("Authorization", "Bearer " + auth.token)
      .expect(403)
      .then((res) => {
        expect(res.text).equals("not authorized to delete post");
      });
  });

  it("successfully deleted post", async () => {
    await request(app)
      .delete("/posts/3")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.text).equals("post deleted");
      });
  });
});

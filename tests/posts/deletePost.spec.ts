import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("DELETE /:id - delete a post", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .delete("/posts/3")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("cannot delete another users post", async () => {
    await request(app)
      .delete("/posts/2")
      .set("x-access-token", token)
      .expect(403)
      .then((res) => {
        expect(res.text).equals("not authorized to delete post");
      });
  });

  it("successfully deleted post", async () => {
    await request(app)
      .delete("/posts/3")
      .set("x-access-token", token)
      .expect(200)
      .then((res) => {
        expect(res.text).equals("post deleted");
      });
  });
});

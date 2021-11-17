import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import { generateAccessToken } from "../../utils/generateToken";

const token = generateAccessToken({
  id: 1,
});

describe("DELETE /:id - delete a score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .delete("/scores/3")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  it("cannot delete another users score", async () => {
    await request(app)
      .delete("/scores/2")
      .set("x-access-token", token)
      .expect(403)
      .then((res) => {
        expect(res.text).equals("user not authorized to delete score");
      });
  });

  it("successfully deleted score", async () => {
    await request(app)
      .delete("/scores/3")
      .set("x-access-token", token)
      .expect(200)
      .then((res) => {
        expect(res.text).equals("score deleted");
      });
  });
});

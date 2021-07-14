import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("DELETE /:id - delete a score", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .delete("/scores/3")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth));

  it("cannot delete another users score", async () => {
    await request(app)
      .delete("/scores/2")
      .set("Authorization", "Bearer " + auth.token)
      .expect(403)
      .then((res) => {
        expect(res.text).equals("user not authorized to delete score");
      });
  });

  it("successfully deleted score", async () => {
    await request(app)
      .delete("/scores/3")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.text).equals("score deleted");
      });
  });
});

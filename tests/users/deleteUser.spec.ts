import app from "../../app";
import { expect } from "chai";
import request from "supertest";
import loginUser from "../utils/loginUser";

const auth = {
  token: "",
};

describe("DELETE /:id - delete a user", () => {
  it("not return results for unauthorized users", async () => {
    await request(app)
      .delete("/users/3")
      .expect(403)
      .then((res) => {
        expect(res.body.length).equals(undefined);
      });
  });

  before(loginUser(auth, 3));

  it("cannot delete another user", async () => {
    await request(app)
      .delete("/users/2")
      .set("Authorization", "Bearer " + auth.token)
      .expect(403)
      .then((res) => {
        expect(res.text).equals("user is not permitted to take this action");
      });
  });

  it("successfully deleted user", async () => {
    await request(app)
      .delete("/users/3")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .then((res) => {
        expect(res.text).equals("user deleted");
      });
  });
});

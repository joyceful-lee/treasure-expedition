import { test } from "node:test";
import assert from "node:assert/strict";
import { usernameError } from "../lib/usernames.ts";
test("public usernames enforce length and safe characters", () => {
  for (const name of ["CompassKid", "Classroom12", "Navigator_24", "Joyce"])
    assert.equal(usernameError(name), null, name);
  for (const name of [
    "ab",
    "this_name_is_far_too_long",
    "two words",
    "email@example.com",
    "<script>",
    "",
    null,
  ])
    assert.ok(usernameError(name));
});
test("public usernames reject profanity, slurs and common disguises", () => {
  for (const name of [
    "f_u_c_k",
    "Sh1tHead",
    "B1tch123",
    "fuuuck",
    "n1gg3r",
    "poRnKing",
    "a55hole",
  ])
    assert.ok(usernameError(name), name);
});

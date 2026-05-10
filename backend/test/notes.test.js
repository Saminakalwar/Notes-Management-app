const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");
const User = require("../src/models/User");
const Note = require("../src/models/Note");

describe("Notes API tests", function () {
  this.timeout(15000);

  let token;
  let noteId;

  const testUser = {
    username: "noteUser",
    email: "noteuser@gmail.com",
    password: "Note1234!",
  };

  before(async () => {
    //clean up user and notes
    await User.deleteMany({ email: testUser.email });
    await Note.deleteMany({});
    //Register and get token

    const res = await request(app).post("/api/auth/register").send(testUser);
    token = res.body.token;
  });

  it("✅ Should create a new note", async function () {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My Test Note",
        content: "This is note to test my app",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("note");
    noteId = res.body.note._id;
  });

  //Get all notes

  it("✅ Should fetch all notes for user", async function () {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("notes").that.is.an("array");
  });

  //update a note
  it("✅ Should update existing note", async function () {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My Updated Test Note",
        content: "This is updated note to test my app",
      });

    expect(res.status).to.equal(200);
    expect(res.body.note.title).to.equal("My Updated Test Note");
  });

  //Fail to delete a note
  it("❌ Should be fail to delete note with invalid id", async function () {
    const res = await request(app)
      .delete("/api/notes/invalid-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.be.oneOf([400, 404]);
  });
  //Delete a note
  it("✅ Should delete existing note", async function () {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});

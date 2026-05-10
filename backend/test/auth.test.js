const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");
const { signResetToken } = require("../src/utils/jwt");

describe("Auth API Tests", function () {
  this.timeout(20000);
  let token;

  const validUser = {
    username: "baqir",
    email: "baqirali@gmail.com",
    password: "Test1234!",
  };

  //Before all tests start ,clean DB properly
  before(async () => {
    try {
      console.log("🧹 Cleaning test user if exists...");
      await User.deleteMany({ email: validUser.email });
    } catch (err) {
      console.error("DB cleanup failed:", err.message);
    }
  });

  //Register new user successfully
  it("✅ Should register a new user", async function () {
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("user");
    expect(res.body.user.email).to.equal(validUser.email);
  });

  //Fail to register
  it("✅ Should fail to register due to missing email", async function () {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "Alia", password: "test1234!" });

    expect(res.status).to.be.oneOf([400, 422]);
  });

  //Successful Login
  it("✅ Should Login valid user & return token", async function () {
    const res = await request(app).post("/api/auth/login").send({
      email: validUser.email,
      password: validUser.password,
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    token = res.body.token; // saving token for later use
  });

  //wrong password
  it("✅ Should fail Login with wrong password", async function () {
    const res = await request(app).post("/api/auth/login").send({
      email: validUser.email,
      password: "Pass123!!",
    });

    expect(res.status).to.be.oneOf([400, 422, 401]);
  });

  //Should get user info
  it("✅ Should get logged in User info Successfully", async function () {
    const res = await request(app)
      .get("/api/auth/get-user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property("email", validUser.email);
  });

  //Should not get user info due to missing token
  it("✅ Should fail to get user info without token", async function () {
    const res = await request(app).get("/api/auth/get-user");
    expect(res.status).to.equal(401);
  });
});

// Password Management Tests

describe("Password Management API Tests", function () {
  this.timeout(20000);
  let resetToken;
  const testEmail = "baqirali@gmail.com";

  it("✅ Should send password reset link for existing user", async function () {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: testEmail });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.match(/sent/i);

    //generate valid token to test next API
    const user = await User.findOne({ email: testEmail });

    // resetToken = jwt.sign({userId: user._id},
    //   process.env.JWT_SECRET, {expiresIn: '10m'}
    // );
    resetToken = signResetToken(user._id);
  });

  //Fail to sent reset link
  it("✅ Should fail to send reset link for non-existing user", async function () {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "wronguser@gmail.com" });

    expect(res.status).to.be.oneOf([404, 200]);
  });

  //Should reset pass successfully
  it("✅ Should reset password successfully with valid token", async function () {
    const res = await request(app)
      .post(`/api/auth/reset-password/${resetToken}`)
      .send({ newPassword: "newPass123!" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.match(/success/i);
  });

  //Should Fail reset pass
  it("✅ Should fail reset password with invalid token", async function () {
    const res = await request(app)
      .post("/api/auth/reset-password/invalidtoken")
      .send({ newPassword: "NewPass123!" });

    expect(res.status).to.be.oneOf([400, 401, 500]);
  });
});

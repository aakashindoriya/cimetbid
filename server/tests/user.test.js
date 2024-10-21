// __tests__/userApi.test.js

const mongoose = require("mongoose");
const supertest = require("supertest");
const { app ,closeServer,server} = require("../index.js");
const User = require("../models/user.model.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const request = supertest(app);

describe("User API", () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGOURLTEST);
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
    server.close()
    closeServer()
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  describe("POST /user/signup", () => {
    it("should sign up a new user successfully", async () => {
      const newUser = {
        username: "TestUser",
        email: "testuser@example.com",
        password: "Password@123",
      };

      const response = await request
        .post("/user/signup")
        .send(newUser)
        .expect(201);

      expect(response.body.user.username).toBe(newUser.username);
      expect(response.body.user.email).toBe(newUser.email);
      expect(response.body.token).toBeDefined();

      // Verify that the user was saved in the database
      const savedUser = await User.findOne({ email: newUser.email });
      expect(savedUser).toBeTruthy();
      expect(await argon2.verify(savedUser.password, newUser.password)).toBe(true); // Check if password is hashed correctly
    });

    it("should return 400 if the user already exists", async () => {
      const existingUser = {
        username: "ExistingUser",
        email: "existinguser@example.com",
        password: "Password@123",
      };

      // First, create the user
      await User.create(existingUser);

      const newUser = {
        username: "AnotherUser",
        email: existingUser.email, // Using the same email
        password: "Password@456",
      };

      const response = await request
        .post("/user/signup")
        .send(newUser)
        .expect(400);

      expect(response.body.message).toBe("User already exists");
    });

    it("should return 400 if the email is invalid", async () => {
      const invalidEmailUser = {
        username: "TestUser",
        email: "invalid-email", // Invalid email format
        password: "Password@123",
      };

      const response = await request
        .post("/user/signup")
        .send(invalidEmailUser)
        .expect(500);

      expect(response.body.message).toBe("User validation failed: email: Invalid email address"); // Adjust this message based on your implementation
    });

    test("user can login and recive user info and token",async ()=>{
        const user = {
            email: "testuser@example.com",
            password: "Password@123",
        };
        const newUser = {
            username: "TestUser",
            email: "testuser@example.com",
            password: "Password@123",
          };
    
            await request
            .post("/user/signup")
            .send(newUser)
            .expect(201);
            const response= await request.post("/user/login").send(user).expect(201)
            expect(response.body.user.email).toBe(newUser.email)
    })
  });
});

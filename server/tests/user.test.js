const request = require("supertest");
const app = require("../index.js"); // Adjust the path based on your project structure
const connectToDB = require("../jest.setup.js");
const { Mongoose, default: mongoose } = require("mongoose");

describe("User API", () => {
  test("connection established", async () => {
    const state = mongoose.connection.readyState;
    expect(state).toBe(1);
  });
});

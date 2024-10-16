const request = require('supertest');
const app = require('../index.js'); // Adjust the path based on your project structure
const { connectDB, closeDB } = require('../setup');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users/signup') // Adjust this endpoint based on your app
      .send({
        username: 'testuser',
        email:"test@gmail.com",
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token', 'user');
  });
});

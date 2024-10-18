const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Adjust this path based on your structure
const User = require('../models/user.model'); // Adjust this path based on your structure



describe('POST /user/signup', () => {
  it('should successfully sign up a new user', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.username).toBe('testuser');
  });

  it('should return 400 if the user already exists', async () => {
    // Create a user first
    await User.create({
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .post('/user/signup')
      .send({
        username: 'anotheruser',
        email: 'existing@example.com', // Same email as above
        password: 'password456',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 500 on server error', async () => {
    // Mock User.findOne to throw an error
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .post('/user/signup')
      .send({
        username: 'erroruser',
        email: 'error@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Database error');
  });
});

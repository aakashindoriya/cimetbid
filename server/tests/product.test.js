const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../index.js");
const Product = require("../models/product.model");
const User =require("../models/user.model.js")
const Bid = require("../models/bid.model");
const request = supertest(app);

beforeAll(async () => {
  // Set environment to test and connect to the test database
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGOURLTEST);
  // await server.listen(process.env.PORT || 8082);
  
});

afterAll(async () => {
  // Disconnect from the test database and close the server
  process.env.NODE_ENV = 'development';
  await mongoose.disconnect();
  server.close();
});

describe("Product API", () => {

  test("should create a new product", async () => {
    const newProduct = {
      type: "property",
      title: "Test Property",
      description: "Test Property Description",
      startingPrice: 5000,
      address: "123 Test Address",
      photos: ["photo1.jpg", "photo2.jpg"],
    };

    const response = await request
      .post("/product/create")
      .send(newProduct)
      .expect(201);

    expect(response.body.title).toBe(newProduct.title);
    expect(response.body.type).toBe(newProduct.type);
  });

  test("should get a list of products", async () => {
    const response = await request.get("/product").expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("should get a single product by id", async () => {
    const product = await Product.create({
      type: "vehicle",
      title: "Test Vehicle",
      description: "Test Vehicle Description",
      startingPrice: 3000,
      number: "1234-AB",
      details: "Test vehicle details",
      vehicleType: "car",
    });

    const response = await request.get(`/product/${product._id}`).expect(200);
    expect(response.body[0]._id).toBe(String(product._id));
    expect(response.body[0].type).toBe("vehicle");
  });

  test("should update an existing product", async () => {
    const product = await Product.create({
      type: "property",
      title: "Old Property",
      description: "Old Description",
      startingPrice: 4000,
      address: "Old Address",
    });

    const updates = {
      title: "Updated Property",
      description: "Updated Description",
      address: "Updated Address",
    };

    const response = await request
      .put(`/product/${product._id}`)
      .send(updates)
      .expect(201);

    expect(response.body.title).toBe(updates.title);
    expect(response.body.address).toBe(updates.address);
  });

  test("should delete an existing product", async () => {
    const product = await Product.create({
      type: "vehicle",
      title: "Vehicle to Delete",
      description: "Vehicle description",
      startingPrice: 6000,
      number: "XYZ-123",
      details: "Vehicle details",
      vehicleType: "truck",
    });

    await request
      .delete(`/product/${product._id}`)
      .expect(204);

    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
  });

  test("should confirm a bid", async () => {
    const user=await User.create({
      username:"dummy",
      email:"dummy@email.com",
      password:"dummy@123"
    })
    const product = await Product.create({
      type: "property",
      title: "Bidding Property",
      description: "Property for bids",
      startingPrice: 7000,
    });

    const bid = await Bid.create({
      product: product._id,
      amount: 8000,
      user: user._id, // Replace with a valid user ID
      status: "pending",
    });

    const requestBody = {
      productId: product._id,
      bidId: bid._id,
    };

    const response = await request
      .put("/product/bid-confirm")
      .send(requestBody)
      .expect(200);

    expect(response.body.successfulBid._id).toBe(String(bid._id));
    expect(response.body.product.status).toBe("sold");
    await User.deleteOne({_id:user._id})
  });
});

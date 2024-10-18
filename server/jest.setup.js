// setup.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {closeServer} = require("./index");
dotenv.config();

async function connectToDB() {
  await mongoose.connect(process.env.MONGOURL);
  console.log('Mongo DB Connected')
}

beforeAll(connectToDB);

afterEach(async () => {
  closeServer()
  await mongoose.connection.close();
});

module.exports = connectToDB;

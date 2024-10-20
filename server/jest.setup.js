const { app, server } = require("./index.js");
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGOURL);
};

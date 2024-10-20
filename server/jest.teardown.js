const mongoose = require("mongoose");
const { server } = require("./index.js");

module.exports = async () => {
  await mongoose.disconnect();
  server.close();
};

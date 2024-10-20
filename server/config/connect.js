const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/myapp")
    .then(() => {
      console.log("Connected to MongoDB");
      // console.log(mongoose.connection.readyState);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connect;

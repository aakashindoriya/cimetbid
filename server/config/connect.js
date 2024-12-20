const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("Connected to MongoDB");
      // console.log(mongoose.connection.readyState);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connect;

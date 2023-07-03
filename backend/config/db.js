const mongoose = require("mongoose");
// require("dotenv").config({ path: "ENV_FILENAME" });

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGOURI, //put your mongoo url connection url
      {
        useNewUrlParser: true,
      }
    );
    console.log("MongoDB Connection Succeeded.");
  } catch (error) {
    console.log("MongoDB Connection :" + error);
  }
};

module.exports = connectDB;

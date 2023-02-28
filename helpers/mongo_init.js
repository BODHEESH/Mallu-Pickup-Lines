const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mallu_pickup_lines",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("💾 mongo_connected"))
    .catch((err) => console.error("mongo_err",err.message));
  console.log("mongodb connected");
};

module.exports = connectDB;

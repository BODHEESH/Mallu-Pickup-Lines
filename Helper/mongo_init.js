const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1/pickup_lines",
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      }
    )
    .then(() => console.log("💾 mongo_connected"))
    .catch((err) => console.error("mongo_err",err.message));
  console.log("mongodb connected");
};

module.exports = connectDB;

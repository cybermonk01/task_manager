const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://manish:manish26@cluster0.bgks5iu.mongodb.net/"
    );
    console.log(
      `MONGODB connected!! DB_HOST ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;

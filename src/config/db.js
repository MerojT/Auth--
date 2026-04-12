import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGO_URL;
  await mongoose.connect(url);

  console.log("База данных подключена");
}

export default connectDB;
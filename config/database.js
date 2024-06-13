// file responsible to connect to the database

import mongoose from "mongoose";

let isConnected = false;

export default async function conncetDB() {
  mongoose.set("strictQuery", true);

  // if connected to the database, dont connect again
  if (isConnected) {
    console.log("MongoDB is already ConnectionClosedEvent....");
    return;
  }

  //connect to MongoDB Database

  try {
    await mongoose.connect(
      process.env.MONGODB_URI.replace("<password>", process.env.PASSWORD)
    );
    isConnected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }
}

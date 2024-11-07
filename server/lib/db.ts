import mongoose from "mongoose";
import { config } from "./lib";

export default async function connectToDatabase() {
  if (typeof config.uri === "string") {
    const conn = await mongoose.connect(config.uri);
    console.log('Database Connected to '+ conn.connection.host);
    return conn;
  } else {
    throw new Error("Database URI is not defined or not a string");
  }
}

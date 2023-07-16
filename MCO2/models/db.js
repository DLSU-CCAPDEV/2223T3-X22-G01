import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";

// Connect to MONGODB_URL, which also includes the database name
const url = process.env.MONGODB_URL;

export default {
  /*
    connects to database
  */
  connect: () => {
    return mongoose.connect(url);
  },
};
import mongoose from "mongoose";

let commentSchema = new mongoose.Schema(
  {
    avatarImage: String,
    userName: String,
    comment: String,
    idFromPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    likes: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);

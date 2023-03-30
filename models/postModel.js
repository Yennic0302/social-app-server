import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    avatarImage: String,
    username: String,
    imgs: Array,
    likes: Number,
    description: String,
    idUserCreater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);

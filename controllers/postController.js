import Post from "../models/postModel.js";

export const createPost = async (req, res, next) => {
  try {
    const post = req.body;
    const createPost = await Post.create({
      avatarImage: post.avatarImage,
      username: post.username,
      imgs: post.imgs,
      description: post.description,
      idUserCreater: post._id,
    });

    if (createPost) {
      res.json({
        status: true,
        post: createPost,
      });
    } else {
      res.json({
        status: false,
        mgs: "error creating post",
      });
    }
  } catch (e) {
    next(e);
  }
};

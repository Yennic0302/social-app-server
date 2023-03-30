import User from "../models/userModel.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const _id = req.params.id;
    let friendStatus = "NONE";

    const getUserInfo = await User.findOne({ _id: userId });

    const userVerifyInRequest = await User.findOne({ _id });

    const userRequestFriend = userVerifyInRequest.friendRequestsFrom.find(
      (user) => user._id == userId
    );

    if (userRequestFriend) {
      friendStatus = "REQUEST-RECIVED";
    }
    const requestFriend = getUserInfo.friendRequestsFrom.find(
      (user) => user._id == _id
    );

    if (requestFriend) {
      friendStatus = "REQUEST-SEND";
    }
    const friend = userVerifyInRequest.friends.find(
      (userTo) => userTo._id == _id
    );

    if (friend) {
      friendStatus = "FRIEND";
    }

    let data = {
      avatarImage: getUserInfo.avatarImage,
      username: getUserInfo.username,
      friendStatus,
      _id: getUserInfo._id,
    };

    if (getUserInfo) {
      res.json({
        status: true,
        data,
      });
    } else {
      res.json({ status: false, msg: "error finding user information" });
    }
  } catch (e) {
    next(e);
  }
};

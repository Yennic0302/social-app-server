import Chat from "../models/chatsModel.js";
import User from "../models/userModel.js";

export const getChatsFromUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    let chatsFromUser = await Chat.find({ chatFromUser: id }).sort({
      updatedAt: -1,
    });

    if (chatsFromUser) {
      res.json({
        status: true,
        chats: chatsFromUser,
      });
    } else {
      res.json({
        status: false,
        msg: "error finding chats",
      });
    }
  } catch (e) {
    next(e);
  }
};

export const createChatUsers = async (req, res, next) => {
  try {
    const idSender = req.params.id;
    const userReceiver = req.body;

    const userSender = await User.findOne({ _id: idSender }).select([
      "username",
      "avatarImage",
    ]);

    const createChatSender = await Chat.create({
      username: userReceiver.username,
      avatarImage: userReceiver.avatarImage,
      view: true,
      messagesPending: 0,
      lastMessage: userReceiver.lastMessage,
      userId: userReceiver._id,
      chatFromUser: idSender,
    });
    const createChatReceiver = await Chat.create({
      username: userSender.username,
      avatarImage: userSender.avatarImage,
      view: false,
      messagesPending: 1,
      lastMessage: userReceiver.lastMessage,
      userId: idSender,
      chatFromUser: userReceiver._id,
    });

    if ((createChatReceiver, createChatSender)) {
      res.json({ status: true, createChatReceiver, createChatSender });
    } else {
      res.json({ status: false, msg: "error in create user" });
    }
  } catch (e) {
    next(e);
  }
};

export const updateChatUsers = async (req, res, next) => {
  try {
    const idSender = req.params.id;
    const userReceiver = req.body;

    const findChatReceiverInDb = await Chat.findOne({
      chatFromUser: userReceiver.userId || userReceiver._id,
      userId: idSender,
    });

    const updateChatSender = await Chat.updateOne(
      {
        chatFromUser: idSender,
        userId: userReceiver.userId || userReceiver._id,
      },
      {
        view: true,
        messagesPending: 0,
        lastMessage: userReceiver.lastMessage,
      }
    );
    let updateChatReceiver;
    if (!onlineUsers.get(userReceiver.userId)) {
      updateChatReceiver = await Chat.updateOne(
        {
          chatFromUser: userReceiver.userId || userReceiver._id,
          userId: idSender,
        },
        {
          view: false,
          messagesPending: findChatReceiverInDb.messagesPending + 1,
          lastMessage: userReceiver.lastMessage,
        }
      );
    }

    res.json({ status: true, updateChatReceiver, updateChatSender });
  } catch (e) {
    next(e);
  }
};

export const updateChatRecieveMessage = async (req, res, next) => {
  const idReciver = req.params.id;
  const userSender = req.body;

  const findChatReceiverInDb = await Chat.findOne({
    chatFromUser: idReciver,
    userId: userSender.chatFromUser,
  });

  const updateChatReceiver = await Chat.updateOne(
    {
      chatFromUser: idReciver,
      userId: userSender.chatFromUser || userSender._id,
    },
    {
      view: false,
      messagesPending: findChatReceiverInDb.messagesPending + 1,
      lastMessage: userSender.lastMessage,
    }
  );

  res.json({ status: true, updateChatReceiver });
};

export const readChatUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userId = req.body.userId;

    const updateReadChat = await Chat.updateOne(
      {
        chatFromUser: id,
        userId: userId,
      },
      {
        messagesPending: 0,
        view: true,
        lastMessage: req.body.lastMessage,
      }
    );

    if (updateReadChat) {
      res.json({ status: true, msg: "read message" });
    } else {
      res.json({ status: false, msg: "no read message" });
    }
  } catch (e) {
    next(e);
  }
};

import { Router } from "express";
import {
  createChatUsers,
  getChatsFromUser,
  updateChatUsers,
  readChatUser,
  updateChatRecieveMessage,
} from "../controllers/chatsUserController.js";

const router = Router();

router.get("/get-chats/:id", getChatsFromUser);
router.post("/create-chat/:id", createChatUsers);
router.put("/update-chat/:id", updateChatUsers);
router.put("/read-chat/:id", readChatUser);
router.put("/update-chat-receiver/:id", updateChatRecieveMessage);

export default router;

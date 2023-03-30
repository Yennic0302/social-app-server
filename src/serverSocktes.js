global.onlineUsers = new Map();

const serverSockets = (io) => {
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("create-chat", (data) => {
      const sendRequestSocket = onlineUsers.get(data.chatFromUser);
      if (sendRequestSocket) {
        socket.to(sendRequestSocket).emit("received-create-chat", data);
      }
    });

    socket.on("update-chat", (data) => {
      const sendRequestSocket = onlineUsers.get(data.userId);
      if (sendRequestSocket) {
        socket.to(sendRequestSocket).emit("received-update-chat", data);
      }
    });

    socket.on("send-request-friend", (data) => {
      const sendRequestSocket = onlineUsers.get(data.id);
      if (sendRequestSocket) {
        socket
          .to(sendRequestSocket)
          .emit("request-recieve", data.requestFriend);
      }
    });

    socket.on("acceted-friend", (data) => {
      const sendRequestSocket = onlineUsers.get(data.id);
      if (sendRequestSocket) {
        socket.to(sendRequestSocket).emit("request-accept", data.idFriend);
      }
    });

    socket.on("send-msg", (data) => {
      const sendRequestSocket = onlineUsers.get(data.to);
      if (sendRequestSocket) {
        socket.to(sendRequestSocket).emit("msg-recieve", data);
      }
    });

    socket.on("disconnect", () => {
      let users = Array.from(onlineUsers);
      users.forEach((elem) => {
        if (elem[1] === socket.id) onlineUsers.delete(elem[0]);
      });
    });
  });
};

export default serverSockets;

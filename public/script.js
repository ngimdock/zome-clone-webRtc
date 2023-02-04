const socket = io();

const USER_ID = 10;

socket.emit("join-room", ROOM_ID, USER_ID);

socket.on("user-connected", (userId) => {
  console.log(`The user #${userId} connected.`);
});

socket.on("user-disconnected", (userId) => {
  console.log(`The user #${userId} disconnected `);
});

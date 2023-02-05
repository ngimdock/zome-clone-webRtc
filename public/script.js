const socket = io();

const peer = new Peer(undefined, {
  host: "/",
  port: "5001",
});

const USER_ID = 10;

peer.on("open", (userId) => {
  socket.emit("join-room", ROOM_ID, userId);
});

socket.on("user-connected", (userId) => {
  console.log(`The user connected: ${userId}`);
});

socket.on("user-disconnected", (userId) => {
  console.log(`The user disconnected: ${userId}`);
});

const videoGrid = document.getElementsByClassName("video-grid");

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    peer.on("call", function (call) {
      call.answer(stream);

      const video = document.createElement("video");

      call.on("stream", function (userVideoStream) {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream);

  const video = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  call.on("close", () => {
    video.remove();
  });
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  videoGrid[0].append(video);
}

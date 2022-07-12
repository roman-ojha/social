import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_BASE_URL as string, {
  withCredentials: true,
});

// socket.on("connect_error", (err) => {
//   console.log(err);
// });
// socket.on("connect_failed", (err) => {
//   console.log(err);
// });
// socket.on("disconnect", (err) => {
//   console.log(err);
// });
socket.on("connect", () => {
  console.log(`connected to id: ${socket.id}`);
});

export default socket;

import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUHSER_KEY,
  secret: process.env.PUHSER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default pusher;

const userMessages = {
  lastMessageOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  messageToId: {
    // messageTo == id of User
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  message: [
    {
      senderId: {
        // Sender == id of User
        type: String,
      },
      content: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
};
export default userMessages;

const initialMessage = {
  messageTo: "mina ojha",
  messageBy: "roman@987",
  message: [
    {
      sender: "roman@987",
      content: "ke gerdai ho ta ani keta",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
    {
      sender: "mina ojha",
      content: "ke gerdai ho ta ani keta",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
    {
      sender: "roman@987",
      content: "ke gerdai ho ta ani keta",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
    {
      sender: "roman@987",
      content: "ke gerdai ho ta ani keta",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
    {
      sender: "mina ojha",
      content: "ke gerdai ho ta ani keta",
      date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    },
  ],
};

// this action will Store the messge of rootUser message to other people and which is currently fetch
const setCurrentUserMessageReducer = (state = initialMessage, action) => {
  if (action.type === "currentUserMessage") {
    return action.payload;
  } else {
    return state;
  }
};

export default setCurrentUserMessageReducer;

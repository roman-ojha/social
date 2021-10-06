const initialMessage = {
  messageTo: "",
  picture: "",
  message: [
    // {
    //   sender: "mina ojha",
    //   content: "ke gerdai ho ta ani keta,khana khako ",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 1,
    // },
    // {
    //   sender: "roman@987",
    //   content: "ke gerdai ho ta ani keta,khana khako ",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 2,
    // },
    // {
    //   sender: "mina ojha",
    //   content: "mata basiraho",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 3,
    // },
    // {
    //   sender: "roman@987",
    //   content:
    //     "laaay, patan mani tight vhayexa , abo best of luck yar for you result",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 4,
    // },
    // {
    //   sender: "roman@987",
    //   content: "Vanja lai aba milecha vane vetna jam la",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 5,
    // },
    // {
    //   sender: "mina ojha",
    //   content:
    //     "mildaina hare namaste garnu oeee.....Ngarnu vhanu vhooo maiali taaaa",
    //   date: "Tue Sep 28 2021 08:53:49 GMT+0545 (Nepal Time)",
    //   _id: 6,
    // },
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

const initialState = {
  content: "",
  image: {},
};

const homePageUserPostFieldDataReducer = (state = initialState, action) => {
  if (action.type === "homePageUserPostFieldData") {
    // console.log(action.payload);
    const { content, image } = action.payload;
    return {
      content,
      image,
    };
  } else if (action.type === "incrementPostCommentNumber") {
    console.log(state);
    console.log(action.payload);
    return state;
  } else {
    return state;
  }
};

export default homePageUserPostFieldDataReducer;

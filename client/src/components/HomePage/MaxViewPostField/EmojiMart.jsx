import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { homePageUserPostFieldDataAction } from "../../../services/redux-actions";
import { Picker } from "emoji-mart";

const EmojiMart = () => {
  const dispatch = useDispatch();
  const displayEmojiPicker = useSelector((state) => state.displayEmojiPicker);
  const homePageUserPostFieldData = useSelector((state) => {
    return state.homePageUserPostFieldDataReducer;
  });

  return (
    <>
      {displayEmojiPicker ? (
        <div>
          <Picker
            set="facebook"
            onSelect={(emoji) => {
              dispatch(
                homePageUserPostFieldDataAction({
                  ...homePageUserPostFieldData,
                  content: homePageUserPostFieldData.content + emoji.native,
                })
              );
            }}
            title="Pick your emoji..."
            emoji="point_up"
            i18n={{
              categories: { search: "Result", recent: "Recents" },
              skintones: {
                2: "Light Skin Tone",
              },
            }}
            style={{ width: "300px" }}
            color="white"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EmojiMart;

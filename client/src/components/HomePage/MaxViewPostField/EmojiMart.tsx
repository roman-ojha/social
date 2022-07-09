import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "emoji-mart";
import { bindActionCreators } from "redux";
import { AppState, actionCreators } from "../../../services/redux";

const EmojiMart = (): JSX.Element => {
  const dispatch = useDispatch();
  const displayEmojiPicker = useSelector(
    (state: AppState) => state.displayEmojiPicker
  );
  const homePageUserPostFieldData = useSelector((state: AppState) => {
    return state.homePageUserPostFieldDataReducer;
  });
  const { homePageUserPostFieldDataAction } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <>
      {displayEmojiPicker ? (
        <div>
          <Picker
            set="facebook"
            onSelect={(emoji) => {
              homePageUserPostFieldDataAction({
                ...homePageUserPostFieldData,
                content: homePageUserPostFieldData.content + emoji.native,
              });
            }}
            title="Pick your emoji..."
            emoji="point_up"
            i18n={{
              categories: { search: "Result", recent: "Recents" },
              // skintones: {
              //   2: "Light Skin Tone",
              // },
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

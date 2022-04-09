import React, { useEffect, useState } from "react";
import User_Profile_Icon from "../Images/User_profile_Icon.svg";
import { instance as axios } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import "../styles/react-components/userPostFeed.css";
import { useHistory } from "react-router-dom";
import { commentBoxAction, incrementPostCommentNumber } from "../redux-actions";

const UserPostFeed = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let uploadedTime;
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const [commentInputField, setCommentInputField] = useState("");
  const [likeValue, setLikeValue] = useState({
    isLikedPost: false,
    likeNo: props.userFeedData.likes.No,
  });
  const [postCommentNumber, setPostCommentNumber] = useState(0);
  const userPostdate = new Date(props.userFeedData.date);
  // const userPostUTCTime = userPostdate.toUTCString();
  const currentDate = new Date();
  // const currentUTCTime = currentDate.toUTCString();
  const difference = (currentDate.getTime() - userPostdate.getTime()) / 1000;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (difference < 60) {
    uploadedTime = `${parseInt(difference)}s`;
  } else if (difference >= 60 && difference < 3600) {
    uploadedTime = `${parseInt(difference / 60)}m`;
  } else if (difference >= 3600 && difference < 86400) {
    uploadedTime = `${parseInt(difference / 3600)}hr`;
  } else if (difference >= 86400 && difference < 604800) {
    uploadedTime = `${parseInt(difference / 86400)}d`;
  } else if (difference >= 604800 && difference < 31536000) {
    let getDate = userPostdate.getDate();
    let getMonth = userPostdate.getMonth();
    let getHour = userPostdate.getHours();
    let getMinute = userPostdate.getMinutes();
    uploadedTime = `${monthNames[getMonth]} ${getDate} at ${getHour}:${getMinute}`;
  } else {
    let getDate = userPostdate.getDate();
    let getYear = userPostdate.getFullYear();
    let getMonth = userPostdate.getMonth();
    uploadedTime = `${monthNames[getMonth]} ${getDate}, ${getYear}`;
  }
  const like = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "/post/like",
        data: {
          postID: props.userFeedData.id,
          to: props.userMainInformation.userID,
        },
        withCredentials: true,
      });
      const data = await res.data;
      if (data.success === true && data.removed === false) {
        // console.log("not removed");
        // Liked the post
        setLikeValue({
          likeNo: likeValue.likeNo + 1,
          isLikedPost: true,
        });
      } else if (data.success === true && data.removed === true) {
        // console.log("remove");
        // Removed Like from the post Post
        setLikeValue({
          likeNo: likeValue.likeNo - 1,
          isLikedPost: false,
        });
      }
      // console.log(data);
    } catch (err) {}
  };
  useEffect(() => {
    setLikeValue({
      ...likeValue,
      isLikedPost: props.userFeedData.likes.by.some(
        (el) => el.userID === userProfileDetailStore.userID
      ),
    });
    setPostCommentNumber(props.userFeedData.comments.No);
  }, []);

  const comment = async () => {
    try {
      const res = await axios({
        url: "/post/comment",
        method: "POST",
        data: {
          comment: commentInputField,
          postID: props.userFeedData.id,
          to: props.userMainInformation.userID,
        },
        withCredentials: true,
      });
      const data = await res.data;
      console.log("hello");
      if (res.status !== 200 && data.success) {
        // Error
      } else {
        dispatch(
          incrementPostCommentNumber({
            postID: props.userFeedData.id,
            to: props.userMainInformation.userID,
          })
        );
        setCommentInputField("");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <div className="HomePage_Feed_Content_Container">
        <div className="HomePage_Feed_Image_Container">
          {props.userFeedData.picture === undefined ? (
            ""
          ) : (
            <img src={props.userFeedData.picture.url} alt="post" />
          )}
        </div>
        <div className="HomePage_Feed_User_Caption_Container">
          <p>{props.userFeedData.caption}</p>
        </div>
        <div className="HomePage_Feed_Info_Container">
          <div className="HomePage_Feed_Info_User_Image">
            <img
              src={
                props.userMainInformation.picture === undefined
                  ? User_Profile_Icon
                  : props.userMainInformation.picture
              }
              onClick={() => {
                history.push(`/u/profile/${props.userMainInformation.userID}`);
              }}
              alt="user"
            />
          </div>
          <div className="HomePage_Feed_User_Name_And_ID_Info_Container">
            <div className="HomePage_Feed_User_Name_Info_Container">
              <p
                className="HomePage_Feed_User_ID_Text"
                onClick={() => {
                  history.push(
                    `/u/profile/${props.userMainInformation.userID}`
                  );
                }}
              >
                {props.userMainInformation.userID}
              </p>
              <p
                className="HomePage_Feed_User_Name_Text"
                onClick={() => {
                  history.push(
                    `/u/profile/${props.userMainInformation.userID}`
                  );
                }}
              >
                {props.userMainInformation.name}
              </p>
            </div>
            <p className="HomePage_Feed_User_Time_Text">{uploadedTime}</p>
          </div>
          <div className="HomePage_Feed_Love_Comment_Share_Info_Container">
            <div className="HomePage_Feed_Icon_Container" onClick={like}>
              {likeValue.isLikedPost ? (
                <Icon
                  className="HomePage_Feed_Liked_Love_Icon"
                  icon="fluent:thumb-like-20-filled"
                />
              ) : (
                <Icon
                  className="HomePage_Feed_UnLiked_Love_Icon"
                  icon="fluent:thumb-like-20-regular"
                />
              )}
              <p>{likeValue.likeNo}</p>
            </div>
            <div className="HomePage_Feed_Icon_Container">
              <Icon
                className="HomePage_Feed__Comment_Icon"
                icon="akar-icons:comment"
                onClick={() => {
                  dispatch(
                    commentBoxAction({
                      openCommentBox: true,
                      postID: props.userFeedData.id,
                      to: props.userMainInformation.userID,
                      comments: props.userFeedData.comments.by,
                    })
                  );
                }}
              />
              <p>{postCommentNumber}</p>
            </div>
            <Icon className="HomePage_Feed_Share_Icon" icon="bx:share" />
            <Icon className="HomePage_Feed_More_Info_Icon" icon="ep:more" />
          </div>
        </div>
        {/* <hr className="UserPostFeed_Post_and_Comment_Break_Line" /> */}
        <div className="UserPostFeed_Comment_Box">
          <div className="UserPostFeed_CommentBox_CommentList">
            {props.userFeedData.comments.by.map((comment, index) => {
              if (index < 1) {
                return (
                  <div
                    className="UserPostFeed_CommentBox_UserComment"
                    key={index}
                  >
                    <img src={comment.picture} />
                    <div>
                      <h3>{comment.userID}</h3>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="UserPostFeed_CommentBox_RootUser_Post_Field_Container">
            <img
              className="UserPostFeed_CommentBox_Image"
              src={userProfileDetailStore.picture}
              img="User"
            />
            <input
              className="UserPostFeed_CommentBox_Input_Field"
              placeholder="Give some thought on this post..."
              type="text"
              value={commentInputField}
              onChange={(e) => {
                setCommentInputField(e.target.value);
              }}
            />
            <Icon
              className="UserPostFeed_CommentBox_Input_Emoji"
              icon="fluent:emoji-24-regular"
            />
            <Icon
              className="UserPostFeed_CommentBox_Input_Emoji"
              icon="bx:send"
              onClick={comment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPostFeed;

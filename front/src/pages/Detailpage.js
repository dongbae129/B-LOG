import React, { useEffect } from "react";
import "../css/detail.css";
import { useDispatch, useSelector } from "react-redux";
import { SUBSCRIBE_USER_REQUEST } from "../reducers/user";
import { PLUS_POST_COUNT_REQUEST, GET_POSTS_REQUEST } from "../reducers/post";
import { usePreloader } from "../lib/PreloadContext";
import { useState } from "react";

const DetailPage = (props) => {
  const [ss, setSS] = useState();
  const { user } = useSelector((state) => state.user);
  const { mainPost } = useSelector((state) => state.post);
  console.log(props, "!!!!");

  // const { userId, nickname } = props.location.state.User;
  // console.log(userId, "@");
  const dispatch = useDispatch();

  // let aa = { title, createdAt, description, User, Hashtags, id, PostCount };
  console.log(props.location.state);
  console.log(ss, "%#@%");

  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: {
        userId: props.match.params.userId,
        postId: props.match.params.postId,
      },
    });
    console.log(props.location.state, " client");
    setSS(props.location.state);
    // dispatch({
    //   type: PLUS_POST_COUNT_REQUEST,
    //   data: id,
    // });
  }, [
    dispatch,
    props.location.state,
    props.match.params.postId,
    props.match.params.userId,
  ]);

  const nick = mainPost && mainPost.User && mainPost.User.nickname.slice();

  usePreloader(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: {
        userId: props.match.params.userId,
        postId: props.match.params.postId,
      },
    });
    console.log("SSSSSSSSSSSSSSSSSSS Page");
  });
  useEffect(() => {
    dispatch({
      type: PLUS_POST_COUNT_REQUEST,
      data: mainPost.id,
    });
  }, [dispatch, mainPost.id]);
  const onClickSubscirbe = () => {
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: mainPost.UserId,
    });
  };
  return (
    <div className="detail-wrapper">
      <div className="personal-header detail_header">
        <div className="user" style={{ marginRight: "10px" }}>
          <div className="user_inner">
            <img src="/images/aa.jpg" alt="" />
            <div>
              <strong>{nick}</strong>
              <br />
              <span>({mainPost.User && mainPost.User.userId})</span>
            </div>
            {user && user.userId === mainPost.userId ? null : (
              <div className="btn_area" onClick={onClickSubscirbe}>
                <span>+</span> 이웃추가
              </div>
            )}
          </div>
        </div>
        <div className="famous_posts-wrapper">
          <strong className="famous_posts-top strong-sect">공지사항</strong>
        </div>
      </div>

      <div className="detail_content">
        <div className="detail_content_header">
          <h2>{mainPost && mainPost.title}</h2>
          <div className="detail_content_nick">
            <p>{mainPost.User && mainPost.User.nickname}</p>
            <p>{mainPost.createdAt && mainPost.createdAt.slice(0, 10)}</p>
          </div>

          <span>
            조회수: {mainPost.PostCount && mainPost.PostCount.hit + 1}
          </span>
          <div>
            {mainPost.Hashtags &&
              mainPost.Hashtags.map((v, i) => (
                <span className="hashtag" key={v + i}>
                  #{v.hashtag}
                </span>
              ))}
          </div>
        </div>

        <div
          className="detail_content_content"
          dangerouslySetInnerHTML={{
            __html: mainPost && mainPost.description,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DetailPage;

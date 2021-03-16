import React, { useEffect } from "react";
import "../css/detail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_INFO_REQUEST,
  SUBSCRIBE_USER_REQUEST,
} from "../reducers/user";
import { PLUS_POST_COUNT_REQUEST, GET_POSTS_REQUEST } from "../reducers/post";
import { usePreloader } from "../lib/PreloadContext";
import swal from "sweetalert";
import querysString from "query-string";

const DetailPage = (props) => {
  const { user, login, checkSubscribe } = useSelector((state) => state.user);
  const { mainPost } = useSelector((state) => state.post);
  // console.log(mainPost, "**");

  const dispatch = useDispatch();

  // /detail/2/45/?nick=bb 13

  // const userId = props.location.state.User.User.userId;
  const userId = querysString.parse(props.location.search).nick;
  // console.log(userId, "%%$%");
  console.log(userId, "!");

  // usePreloader(() => {
  //   console.log(props.match.params, "%%%%%%%%%%%%%%");
  //   dispatch({
  //     type: GET_POSTS_REQUEST,
  //     data: {
  //       userId: props.match.params.userId,
  //       postId: props.match.params.postId,
  //     },
  //   });
  //   // dispatch({
  //   //   type: PLUS_POST_COUNT_REQUEST,
  //   //   data: id,
  //   // });
  // }, [
  //   dispatch,
  //   props.location.state,
  //   props.match.params.postId,
  //   props.match.params.userId,
  // ]);
  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: {
        userId: props.match.params.userId,
        postId: props.match.params.postId,
      },
    });
  }, [
    dispatch,
    props.location.state,
    props.match.params.postId,
    props.match.params.userId,
  ]);

  let subsArr = [];
  if (user && user.subscribe) {
    user.subscribe.map((v) => {
      if (v.checked) subsArr.push(v.toUserNickname);
      return 0;
    });
  }
  const nick = mainPost && mainPost.User && mainPost.User.nickname.slice();
  console.log(subsArr, subsArr.includes(nick), "!@!@!");

  usePreloader(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: {
        userId: props.match.params.userId,
        postId: props.match.params.postId,
      },
    });
    console.log(mainPost, "^^^^^^^^^^^^");
    console.log(props.location, "!@@@@@@@@!@!@!@!");
    console.log(props.match.params, "%%%%%%%%%%%%%%");
  });
  useEffect(() => {
    dispatch({
      type: PLUS_POST_COUNT_REQUEST,
      data: mainPost.id,
    });
  }, [dispatch, mainPost.id]);
  useEffect(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
      data: userId,
    });
  }, [dispatch, userId]);
  const onClickSubscirbe = () => {
    if (!login) {
      swal("로그인 해주세요!!", "", "warning");
      return;
    }
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: {
        userId: mainPost.User.userId,
        userNickname: mainPost.User.nickname,
      },
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
            {(user && user.notSubsUser) ||
            (user && user.toSubscribe && user.toSubscribe.checked === false) ||
            checkSubscribe ? (
              <div className="btn_area nosub" disabled>
                <div>+</div> 이웃 신청중
              </div>
            ) : (user &&
                user.userId === (mainPost.User && mainPost.User.userId)) ||
              subsArr.includes(nick) ||
              (user && user.toSubscribe && user.toSubscribe.checked) ? null : (
              <div className="btn_area" onClick={onClickSubscirbe}>
                <div>+</div> 이웃추가
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

export default React.memo(DetailPage);

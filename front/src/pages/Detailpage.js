import React, { useEffect } from "react";
import "../css/detail.css";
import { useDispatch, useSelector } from "react-redux";
import { SUBSCRIBE_USER_REQUEST } from "../reducers/user";
import { PLUS_POST_COUNT_REQUEST } from "../reducers/post";

const DetailPage = (props) => {
  const { user } = useSelector((state) => state.user);
  const { userId, nickname } = props.location.state.User;
  const dispatch = useDispatch();
  const {
    title,
    createdAt,
    description,
    User,
    Hashtags,
    id,
    PostCount,
  } = props.location.state;

  const nick = nickname.slice();

  useEffect(() => {
    dispatch({
      type: PLUS_POST_COUNT_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  const onClickSubscirbe = () => {
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: User.userId,
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
              <span>({userId})</span>
            </div>
            {user && user.userId === userId ? null : (
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
          <h2>{title}</h2>
          <div className="detail_content_nick">
            <p>{User.nickname}</p>
            <p>{createdAt.slice(0, 10)}</p>
          </div>

          <span>조회수: {PostCount.hit + 1}</span>
          <div>
            {" "}
            {Hashtags &&
              Hashtags.map((v, i) => (
                <span className="hashtag" key={v + i}>
                  #{v.hashtag}
                </span>
              ))}
          </div>
        </div>

        <div
          className="detail_content_content"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  );
};

export default DetailPage;

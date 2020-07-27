import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SUBSCRIBE_USER_REQUEST } from "../reducers/user";
import { PLUS_POST_COUNT_REQUEST } from "../reducers/post";

const DetailPage = (props) => {
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
  console.log(props);
  return (
    <div>
      <div style={{ width: "171px", border: "1px solid black" }}>
        <img
          src="/images/aa.jpg"
          alt=""
          style={{ width: "161px", height: "161px" }}
        />
        <div>
          <strong>{User.nickname}</strong>
          <br />
          <span>({User.userId})</span>
        </div>
        <button onClick={onClickSubscirbe}>이웃추가</button>
      </div>
      <div className="content">
        <h2>{title}</h2>
        <span>조회수: {PostCount.hit + 1}</span>

        <p>{User.nickname}</p>

        <p>{createdAt.slice(0, 10)}</p>
        {Hashtags &&
          Hashtags.map((v, i) => <span key={v + i}>#{v.hashtag}</span>)}

        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};

export default DetailPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POSTS_REQUEST } from "../reducers/post";
import Detail from "../component/Detail";
import { SUBSCRIBE_USER_REQUEST } from "../reducers/user";
const Personalpage = (props) => {
  const { mainPost } = useSelector((state) => state.post);
  const { nickname } = props.match.params;
  const { userId } = props.location.state.user;
  const dispatch = useDispatch();
  const nick = nickname.slice(1);
  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: userId,
    });
  }, [dispatch, userId]);

  const onClickSubscirbe = () => {
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: userId,
    });
  };
  return (
    <div className="personal-wrapper">
      <div className="personal-header" style={{ display: "flex" }}>
        <div className="personal-header user" style={{ marginRight: "10px" }}>
          <div style={{ width: "171px", border: "1px solid black" }}>
            <img
              src="/images/aa.jpg"
              alt=""
              style={{ width: "161px", height: "161px" }}
            />
            <div>
              <strong>{nick}</strong>
              <br />
              <span>여기는 userId</span>
            </div>
            <button onClick={onClickSubscirbe}>이웃추가</button>
          </div>
        </div>
        <div
          className="psersonal-header famous_posts"
          style={{ width: "600px", border: "1px solid black" }}
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div className="personal-body">
        {mainPost.map((v, i) => (
          <Detail props={v} key={v + i} />
        ))}
      </div>
    </div>
  );
};

export default Personalpage;

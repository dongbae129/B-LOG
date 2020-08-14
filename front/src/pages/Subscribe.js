import React from "react";
import { useDispatch } from "react-redux";
import { ACCEPT_SUBSCRIBE_USER_REQUEST } from "../reducers/user";

const Subscribe = (props) => {
  const dispatch = useDispatch();

  const onClickAcceptSubs = (userId) => () => {
    dispatch({
      type: ACCEPT_SUBSCRIBE_USER_REQUEST,
      data: userId,
    });
  };
  return (
    <>
      {props.location.state.map((v) => (
        <div key={v}>
          <span>
            {v.userNickname}({v.userId})
          </span>
          <span onClick={onClickAcceptSubs(v.UserId)}>친구수락</span>
        </div>
      ))}
    </>
  );
};

export default Subscribe;

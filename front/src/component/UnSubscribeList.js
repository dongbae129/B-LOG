import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPT_SUBSCRIBE_USER_REQUEST,
  UNACCEPTSUBS_USER_REQUEST,
} from "../reducers/user";
import "../css/unsubscribelist.css";

const UnSubscribeList = (props) => {
  const { unacceptSubs } = useSelector((state) => state.user);
  console.log(unacceptSubs, "@@");
  const { userId } = props.match.params;
  const dispatch = useDispatch();

  const onClickAccept = (UserId) => () => {
    dispatch({
      type: ACCEPT_SUBSCRIBE_USER_REQUEST,
      data: UserId,
    });
  };

  useEffect(() => {
    dispatch({
      type: UNACCEPTSUBS_USER_REQUEST,
      data: userId,
    });
  }, [dispatch, userId]);
  console.log(userId, "!");
  return (
    <div className="unsubscribelist-wrap-wrapper">
      {/* <div className="test"></div> */}
      <ul className="unsubscribelist-wrap">
        {unacceptSubs.length > 0 ? (
          unacceptSubs.map((v, i) => {
            return (
              <li>
                <div className="unsubs-body" key={v + i}>
                  <div className="unsubs-img">img</div>
                  <div className="unsubs-content">
                    <div className="unsubs-nickname">{v.userNickname}</div>
                    <div className="unsubs-button">
                      <div
                        className="unsubs_click_button"
                        onClick={onClickAccept(v.UserId)}
                      >
                        수락
                      </div>
                      <div className="unsubs_click_button">거절</div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p>친구신청 요청이 존재하지 않습니다</p>
        )}
      </ul>
    </div>
  );
};

export default UnSubscribeList;

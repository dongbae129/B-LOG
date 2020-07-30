import React, { useState } from "react";
import "../css/userside.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_USER_INFO_REQUEST } from "../reducers/user";
import { Link } from "react-router-dom";
import SubscribeList from "./SubscribeList";
import { onClickLogout } from "./Header";
// import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserSide = () => {
  const [checkUserList, setCheckUserList] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
  }, [dispatch]);
  // if (subscribe.subscribe) {
  //   alert(subscribe.subscribe.length + "명이 친구추가를 하였습니다");
  // }
  const onClickUserList = () => {
    setCheckUserList((prev) => !prev);
  };
  return (
    <aside className="side-wrap">
      <div className="side">
        <div className="profile">
          {user && (
            <div className="my_accout">
              <div className="my_account head">
                <div className="my_account user-icon">
                  <img src="/images/user-icon.png" alt="" />
                  {/* <FontAwesomeIcon icon={faUserCircle} size="3x" /> */}
                </div>
                <div className="my_account info">
                  <strong>{user.nickname}</strong>
                  <br />
                  <span>{user.userId}</span>
                </div>
                <button
                  className="my_account head logout pointer"
                  onClick={onClickLogout(dispatch)}
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
          {user && (
            <div>
              <nav className="menu_my_blog">
                <div className="menu_my_blog blog">
                  <div className="menu_my_blog gomy pointer">내 블로그</div>
                  <div className="menu_my_blog texting pointer">
                    <Link to="/write">글쓰기</Link>
                  </div>
                </div>
                <div className="menu_my_blog neighbor">
                  <div
                    className="neighborlist pointer"
                    onClick={onClickUserList}
                  >
                    이웃목록
                  </div>
                  <input type="text" />
                  <div className="search">
                    <img src="/images/search.png" alt="" />
                  </div>
                </div>
                {checkUserList && (
                  <div>
                    <SubscribeList user={user} />
                  </div>
                )}

                {/* <div className="neighbor">
                  <Link to={{ pathname: "/subscribe", state: user.subscribe }}>
                    <div>{user.subscribe && user.subscribe.length}</div>
                  </Link>
                </div> */}
              </nav>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default UserSide;

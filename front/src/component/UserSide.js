import React from "react";
import "../css/userside.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_USER_INFO_REQUEST } from "../reducers/user";
import { Link } from "react-router-dom";

const UserSide = () => {
  const { user, login } = useSelector((state) => state.user);
  const { subscribe } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
  }, [dispatch]);
  // if (subscribe.subscribe) {
  //   alert(subscribe.subscribe.length + "명이 친구추가를 하였습니다");
  // }

  return (
    <aside className="side-wrap">
      <div className="side">
        <div className="profile">
          {user && (
            <div className="my_accout">
              <span>{user.nickname}</span>
              <span>{user.userId}</span>
              <span>로그아웃</span>
            </div>
          )}
          {user && (
            <div>
              <nav className="menu_my_blog">
                <div className="my_blog">내 블로그</div>
                <div className="neighbor">
                  <Link to="/write">글쓰기</Link>
                  <Link to={{ pathname: "/subscribe", state: subscribe }}>
                    <div>{user.subscribe && user.subscribe.length}</div>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default UserSide;

import React, { useState } from "react";
import "../css/userside.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_USER_INFO_REQUEST, LOG_IN_REQUEST } from "../reducers/user";
import { Link } from "react-router-dom";
import SubscribeList from "./SubscribeList";
import { onClickLogout } from "./Header";
import { usePreloader } from "../lib/PreloadContext";

const UserSide = () => {
  const [checkUserList, setCheckUserList] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  usePreloader(() => {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
  });
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
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert("아이디 또는 비밀번호를 입력해주세요");
      return;
    }
    dispatch(
      {
        type: LOG_IN_REQUEST,
        data: { id, password },
      },
      [id, password]
    );
  };
  return (
    <aside className="side-wrap">
      <div className="side">
        <div className="profile">
          {user ? (
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
          ) : (
            <div className="nouser">
              <form onSubmit={onSubmitLogin}>
                <div className="inputwrap">
                  <input type="text" value={id} onChange={onChangeId} />
                  <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>
                {/* <Link to="/"></Link> */}
                <button type="submit">로그인</button>
                <Link to="/signup">
                  <button>회원가입</button>
                </Link>
              </form>
            </div>
          )}
          {user && (
            <div>
              <nav className="menu_my_blog">
                <div className="menu_my_blog blog">
                  <div className="menu_my_blog gomy pointer">
                    <Link
                      to={{
                        pathname: `/personal/${user.userId}`,
                        state: { user },
                      }}
                    >
                      내 블로그
                    </Link>
                  </div>

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

                  <div className="neighboralarm pointer">
                    <Link to={`/subscribeList/${user.userId}`}>이웃알림</Link>
                  </div>
                </div>
                <div className="neighborsearch">
                  <input type="text" />
                  <div className="search">
                    <img src="/images/search.png" alt="" />
                  </div>
                </div>

                {checkUserList && (
                  <div>
                    <SubscribeList st={user} />
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

import React from "react";
import "../css/header.css";
import { Link, Route } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>B-LOG</h1>
        </Link>

        <div className="button">
          {user ? (
            <button onClick={onClickLogout}>로그아웃</button>
          ) : (
            <Link to="/login">
              <button>로그인</button>
            </Link>
          )}

          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;

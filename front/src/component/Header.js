import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

export const onClickLogout = (dispatch) => () => {
  dispatch({
    type: LOG_OUT_REQUEST,
  });
};
const Header = () => {
  const { login } = useSelector((state) => state.user);

  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>B-LOG</h1>
        </Link>

        <div className="button">
          {!login && (
            <>
              <div className="header-btn">
                <Link to="/login">로그인</Link>
              </div>

              <div className="header-btn">
                <Link to="/signup">회원가입</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

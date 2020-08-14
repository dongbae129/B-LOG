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
              <Link to="/login">
                <button>로그인</button>
              </Link>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

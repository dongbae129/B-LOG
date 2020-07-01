import React from "react";
import "../css/header.css";
import { Link, Route } from "react-router-dom";
import Loginpage from "../pages/Loginpage";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>B-LOG</h1>
        </Link>

        <div className="button">
          <Link to="/login">
            <button>로그인</button>
          </Link>
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

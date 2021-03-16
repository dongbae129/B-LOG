import React from "react";
import "../css/main.css";
import Content from "../component/Content";
import UserSide from "../component/UserSide";

const Main = () => {
  return (
    <div className="layout-content">
      <Content />
      <UserSide />
    </div>
  );
};

export default Main;

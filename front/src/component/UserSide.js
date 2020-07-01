import React from "react";
import "../css/userside.css";
const dummy_user = {
  id: "아이디",
  img: "이미지",
};
const UserSide = () => {
  return (
    <aside className="side-wrap">
      <div className="side">
        <div className="profile">
          <div className="my_accout">
            <span>{dummy_user.img}</span>
            <span>{dummy_user.id}</span>
            <span>로그아웃</span>
          </div>
          <nav className="menu_my_blog">
            <div className="my_blog">내 블로그</div>
            <div className="neighbor">글쓰기</div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default UserSide;

import React from "react";

const Signuppage = () => {
  return (
    <div>
      <form>
        <div>
          <h3>아이디</h3>
          <input type="text" />
        </div>
        <div>
          <h3>비밀번호</h3>
          <input type="text" />
        </div>
        <div>
          <h3>비밀번호 재확인</h3>
          <input type="text" />
        </div>
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default Signuppage;

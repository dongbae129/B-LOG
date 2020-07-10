import React from "react";
import { useInput } from "./Signuppage";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";

const Loginpage = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassw] = useInput("");
  const dispatch = useDispatch();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(id, password);
      dispatch({
        type: LOG_IN_REQUEST,
        data: { id, password },
      });
    },
    [dispatch, id, password]
  );

  return (
    <div>
      <form>
        <div>
          <h3>아이디</h3>
          <input type="text" value={id} onChange={onChangeId} />
        </div>
        <div>
          <h3>비밀번호</h3>
          <input type="password" value={password} onChange={onChangePassw} />
        </div>
        <button type="submit" onClick={submitForm}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Loginpage;

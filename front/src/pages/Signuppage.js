import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SIGN_UP_REQUEST, initialState } from "../reducers/user";
import { useState } from "react";

export const useInput = (initialValue = null) => {
  const [value, setter] = useState(initialValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};
const Signuppage = () => {
  // const [passwCheck, setPasswCheck] = useState();
  const [passwCheckError, setPasswCheckError] = useState(false);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassw] = useInput("");
  const [nickname, onChangeNick] = useInput("");

  const dispatch = useDispatch();

  const onChangePasswCheck = useCallback(
    (e) => {
      setPasswCheckError(e.target.value !== password);
      // setPasswCheck(e.target.value)
    },
    [password]
  );

  const onClickForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nickname,
        },
      });
    },
    [dispatch, id, nickname, password]
  );
  return (
    <div>
      <form>
        <div>
          <h3>아이디</h3>
          <input type="text" value={id} onChange={onChangeId} />
        </div>
        <div>
          <h3>닉네임</h3>
          <input type="text" value={nickname} onChange={onChangeNick} />
        </div>
        <div>
          <h3>비밀번호</h3>
          <input type="password" value={password} onChange={onChangePassw} />
        </div>
        <div>
          <h3>비밀번호 재확인</h3>
          <input type="password" onChange={onChangePasswCheck} />
          {passwCheckError && <p>비밀번호가 일치하지 않습니다</p>}
        </div>
        <button type="submit" onClick={onClickForm}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signuppage;

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useState } from "react";
import "../css/signin.css";

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
  const [passCheck, setPassCheck] = useState(false);
  const [passErrorCheck, setPassErrorCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassw] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  // const [idCheck, setIdCheck] = blurInput();

  const dispatch = useDispatch();

  const onChangePasswCheck = useCallback(
    (e) => {
      setPasswCheckError(e.target.value !== password);
      setPassErrorCheck(e.target.value !== password);
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
  const onContentBlur = (setter) => (e) => {
    if (e.target.value === "") {
      setter(true);
    } else setter(false);
  };
  return (
    <div className="signin-wrap">
      <form className="signin-wrap_content">
        <div>
          <h3>아이디</h3>
          <input
            type="text"
            value={id}
            onChange={onChangeId}
            required
            onBlur={onContentBlur(setIdCheck)}
          />
          {idCheck && <p>아이디 입력하세요</p>}
        </div>
        <div>
          <h3>닉네임</h3>
          <input
            type="text"
            value={nickname}
            onChange={onChangeNick}
            required
            onBlur={onContentBlur(setNickCheck)}
          />
          {nickCheck && <p>닉네임을 입력하세요</p>}
        </div>
        <div>
          <h3>비밀번호</h3>
          <input
            type="password"
            value={password}
            onChange={onChangePassw}
            required
            onBlur={onContentBlur(setPassCheck)}
          />
          {passCheck && <p>비밀번호를 입력하세요</p>}
        </div>
        <div>
          <h3>비밀번호 재확인</h3>
          <input
            type="password"
            onChange={onChangePasswCheck}
            required
            onBlur={onContentBlur(setPassErrorCheck)}
          />
          {passErrorCheck && <p>비밀번호 재확인을 해주세요</p>}
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

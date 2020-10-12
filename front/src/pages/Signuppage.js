import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_USER_ID_REQUEST, SIGN_UP_REQUEST } from "../reducers/user";
import { useState } from "react";
import swal from "sweetalert";
// import "../css/signin.css";

export const useInput = (initialValue = null) => {
  const [value, setter] = useState(initialValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};
export const onChangeLabelBlur = (setter) => (e) => {
  if (e.target.value === "") setter((prev) => (prev = !prev));
};
const Signuppage = (props) => {
  // const [passwCheck, setPasswCheck] = useState();
  const [passwCheckError, setPasswCheckError] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [submitPassCheck, setSubmitPassCheck] = useState(false);
  const [idTest, setIdTest] = useState(false);
  const [nicknameBlur, setNicknameBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [checkPassBlur, setCheckPassBlur] = useState(false);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassw] = useInput("");
  const [nickname, onChangeNick] = useInput("");

  const dispatch = useDispatch();
  const { checkUserId } = useSelector((state) => state.user);

  // const onChangeIdLabel = (e) => {
  //   if (e.target.value === "") setIdTest((prev) => (prev = !prev));
  // };

  const onChangePasswCheck = useCallback(
    (e) => {
      setPasswCheckError(e.target.value !== password);
      setSubmitPassCheck(e.target.value === password);
    },
    [password]
  );

  const onClickForm = useCallback(
    (e) => {
      e.preventDefault();

      if (password && passwCheckError) {
        swal("비밀번호 중복 확인을 해주세요", "", "warning");
        return;
      }
      if (checkUserId) swal("아이디 중복확인을 해주세요", "", "error");
      if (!id || !password || !nickname || !submitPassCheck) {
        swal("빈칸을 채워주세요", "", "error");
        return;
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nickname,
        },
        push: props.history.push,
      });
    },
    [
      password,
      passwCheckError,
      checkUserId,
      id,
      nickname,
      submitPassCheck,
      dispatch,
      props.history.push,
    ]
  );
  const onContentBlur = (setter, blurLabel) => (e) => {
    if (e.target.id === "idlabel") {
      if (e.target.value !== "") {
        dispatch({
          type: CHECK_USER_ID_REQUEST,
          data: e.target.value,
        });
      }
    }
    // e.target.id === "idlabel" &&
    //   e.target.value !== "" &&
    //   dispatch({
    //     type: CHECK_USER_ID_REQUEST,
    //     data: e.target.value,
    //   });
    if (e.target.value === "") {
      setter(true);
      blurLabel((prev) => (prev = !prev));
      // onLabelBlurId();
    } else setter(false);
  };
  return (
    <div className="loginWraper">
      <form>
        {/* <div className="signin-wrap">
       <form className="signin-wrap_content"> */}
        <div className="inputwrap">
          {/* <h3>아이디</h3> */}
          <input
            id="idlabel"
            type="text"
            value={id}
            onChange={onChangeId}
            required
            onFocus={onChangeLabelBlur(setIdTest)}
            onBlur={onContentBlur(setIdCheck, setIdTest)}
          />
          <label
            htmlFor="idlabel"
            className={idTest ? `input_label move_label` : "input_label"}
          >
            아이디
          </label>
          {checkUserId === null ? null : checkUserId ? (
            <span className="error_box-red">
              <p>이미 사용중인 아이디 입니다.</p>
            </span>
          ) : (
            <span className="error_box-green">
              <p>멋진 아이디 입니다!</p>
            </span>
          )}
          {idCheck && <p>아이디를 입력하세요</p>}
        </div>
        <div className="inputwrap">
          <input
            id="nicknamelabel"
            type="text"
            value={nickname}
            onChange={onChangeNick}
            required
            onFocus={onChangeLabelBlur(setNicknameBlur)}
            onBlur={onContentBlur(setNickCheck, setNicknameBlur)}
          />
          <label
            htmlFor="nicknamelabel"
            className={nicknameBlur ? `input_label move_label` : "input_label"}
          >
            닉네임
          </label>
          {nickCheck && <p>닉네임을 입력하세요</p>}
        </div>
        <div className="inputwrap">
          <input
            id="passlabel"
            type="password"
            value={password}
            onChange={onChangePassw}
            required
            onFocus={onChangeLabelBlur(setPasswordBlur)}
            onBlur={onContentBlur(setPassCheck, setPasswordBlur)}
          />
          <label
            htmlFor="passlabel"
            className={passwordBlur ? `input_label move_label` : "input_label"}
          >
            비밀번호
          </label>
          {passCheck && <p>비밀번호를 입력하세요</p>}
        </div>
        <div className="inputwrap">
          <input
            id="passchlabel"
            type="password"
            onChange={onChangePasswCheck}
            required
            onFocus={onChangeLabelBlur(setCheckPassBlur)}
            onBlur={onContentBlur(setPassCheck, setCheckPassBlur)}
            // onBlur={onContentBlur(setPassErrorCheck)}
          />
          <label
            htmlFor="passchlabel"
            className={checkPassBlur ? `input_label move_label` : "input_label"}
          >
            비밀번호 재확인
          </label>

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

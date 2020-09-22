import React, { useState } from "react";
import { useInput } from "./Signuppage";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
import "../css/login.css";
import { Redirect } from "react-router-dom";

const Loginpage = (props) => {
  const [idlabel, setIdLabel] = useState(false);
  const [passlabel, setPassLabel] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassw] = useInput("");

  const { user, loginSuccess } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!id || !password) {
        alert("아이디 또는 비밀번호를 입력해주세요");
        return;
      }
      dispatch({
        type: LOG_IN_REQUEST,
        data: { id, password },
      });
    },
    [dispatch, id, password]
  );
  const onChangeIdLabel = (e) => {
    if (e.target.value === "") setIdLabel((prev) => (prev = !prev));
  };
  const onChangePassLabel = (e) => {
    if (e.target.value === "") setPassLabel((prev) => (prev = !prev));
  };
  const onLabelBlurId = (e) => {
    if (e.target.value === "") setIdLabel((prev) => (prev = !prev));
  };
  const onLabelBlurPassw = (e) => {
    if (e.target.value === "") setPassLabel((prev) => (prev = !prev));
  };

  return (
    <div>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div className="loginWraper">
          <form>
            <div className="inputwrap">
              <input
                id="idlabel"
                type="text"
                value={id}
                onChange={onChangeId}
                onFocus={onChangeIdLabel}
                onBlur={onLabelBlurId}
              />
              <label
                htmlFor="idlabel"
                className={idlabel ? `input_label move_label` : "input_label"}
              >
                아이디
              </label>
            </div>
            <div className="inputwrap">
              <input
                id="pslabel"
                type="password"
                value={password}
                onChange={onChangePassw}
                onFocus={onChangePassLabel}
                onBlur={onLabelBlurPassw}
              />
              <label
                htmlFor="pslabel"
                className={passlabel ? `input_label move_label` : "input_label"}
              >
                비밀번호
              </label>
            </div>
            <button type="submit" onClick={submitForm}>
              로그인
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Loginpage;

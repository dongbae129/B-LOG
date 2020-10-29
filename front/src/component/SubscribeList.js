import React from "react";

const SubscribeList = ({ st }) => {
  const { subscribe } = st;

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        marginTop: "10px",
      }}
    >
      {subscribe &&
        subscribe.map((v, i) => (
          <div
            style={{
              width: "50%",
              display: "inline-block",
              textAlign: "center",
              marginBottom: "8px",
            }}
            key={v + i}
          >
            {v.fromUserNickname}
          </div>
        ))}
      {st.toSubsUser &&
        st.toSubsUser.map((v, i) => (
          <div
            style={{
              width: "50%",
              display: "inline-block",
              textAlign: "center",
              marginBottom: "8px",
            }}
            key={v + i}
          >
            {v.toUserNickname}
          </div>
        ))}
    </div>
  );
};

export default React.memo(SubscribeList);

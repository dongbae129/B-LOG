import React from "react";

const SubscribeList = ({ st }) => {
  const { subscribe } = st;
  console.log(subscribe, "!!");
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
            {v.userNickname}
          </div>
        ))}
    </div>
  );
};

export default SubscribeList;

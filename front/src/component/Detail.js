import React from "react";
import { Link } from "react-router-dom";

const Detail = ({ props }) => {
  return (
    <div className="content">
      <h2>{props.title}</h2>
      <Link
        to={{
          pathname: `/personal/:${props.User.nickname}`,
          state: { user: props.User },
        }}
      >
        <p>{props.User.nickname}</p>
      </Link>

      <p>{props.createdAt.slice(0, 10)}</p>
      {props.Hashtags &&
        props.Hashtags.map((v, i) => <span key={v + i}>#{v.hashtag}</span>)}

      <Link to={{ pathname: "/detail", state: props }}>
        <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
      </Link>
    </div>
  );
};

export default Detail;

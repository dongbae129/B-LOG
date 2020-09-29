import React from "react";
import { Link } from "react-router-dom";
import sanitize from "sanitize-html";

const ContentInfo = ({ props }) => {
  const ht = sanitize(props.description, {
    allowedTags: ["b", "i", "a"],
  });
  // console.log(props, "$$");

  return (
    <div>
      <h2>{props.title}</h2>
      <Link
        to={{
          pathname: `/personal/${props.User.userId}`,
          state: { user: props.User },
        }}
      >
        <p>{props.User.nickname}</p>
      </Link>

      <p>{props.createdAt.slice(0, 10)}</p>
      {props.Hashtags &&
        props.Hashtags.map((v, i) => <span key={v + i}>#{v.hashtag}</span>)}
      <br />

      <Link
        to={{
          pathname: `/detail/${props.User.id}/${props.id}`,
          state: props,
        }}
      >
        {/* <div dangerouslySetInnerHTML={{ __html: props.description }}></div> */}
        {/* <span>{props.description.length > 200 ? `${props.description.slice(0, 200)}...` : props.description}</span> */}
        <span>{ht.length > 200 ? `${ht.slice(0, 200)}...` : ht}</span>
      </Link>
    </div>
  );
};

export default ContentInfo;

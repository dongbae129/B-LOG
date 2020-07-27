import React from "react";
import { Link } from "react-router-dom";
import sanitize from "sanitize-html"

const Detail = ({ props }) => {
  let ht = sanitize(props.description,{
    allowedTags:['b', 'i', 'em', 'strong', 'a']
  })
  // console.log(props)
  return (
    <div className="content">
      <div className="aa">
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
        <br/>

        <Link to={{ pathname: "/detail", state: props }}>
        {/* <div dangerouslySetInnerHTML={{ __html: props.description }}></div> */}
          <span>{ht.length > 200 ? `${ht.slice(0,200)}...` : ht}</span>
        </Link>
      </div>
      {props.Images.length > 0 ? <div className="bb">
        <img src={`http://localhost:8020/${props.Images[0].src}`} alt=""/>
      </div> : null}
      
      
      
    </div>
  );
};

export default Detail;

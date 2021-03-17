import React from "react";
import { Link } from "react-router-dom";
import ContentInfo from "./Content_info";

const Detail = ({ props }) => {
  return (
    <div className="content">
      {props.Images.length > 0 ? (
        <>
          <div className="contentsmalldiv">
            <ContentInfo props={props} />
          </div>
          <div className="content-image">
            <Link
              to={{
                pathname: `/detail/${props.User.id}/${props.id}`,
                search: `?nick=${props.User.userId}`,
              }}
            >
              <img
                // src={`http://localhost:8020/${props.Images[0].src}`}
                src={`http://localhost:8020/${props.Images[0].src}`}
                alt=""
              />
            </Link>
          </div>
        </>
      ) : (
        <div className="contentdiv">
          <ContentInfo props={props} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Detail);

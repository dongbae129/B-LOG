import React from "react";
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
            <img
              src={`http://211.193.71.154:8020/${props.Images[0].src}`}
              alt=""
            />
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

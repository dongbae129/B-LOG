import React from "react";
import styled from "styled-components";
import ContentInfo from "./Content_info";

const ContentDiv = styled.div`
  width: 100%;
  word-break: break-all;
`;
const ContentSmallDiv = styled.div`
  width: 580px;
  padding-right: 10px;
  word-break: break-all;
`;
const Detail = ({ props }) => {
  return (
    <div className="content">
      {props.Images.length > 0 ? (
        <>
          <ContentSmallDiv>
            <ContentInfo props={props} />
          </ContentSmallDiv>
          <div className="content-image">
            <img src={`http://localhost:8020/${props.Images[0].src}`} alt="" />
          </div>
        </>
      ) : (
        <ContentDiv>
          <ContentInfo props={props} />
        </ContentDiv>
      )}
    </div>
  );
};

export default Detail;

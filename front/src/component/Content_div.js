import React from "react";
import { Link } from "react-router-dom";
import sanitize from "sanitize-html";
export const ht = (data) =>
  sanitize(data, {
    allowedTags: ["b", "i", "em", "strong", "a"],
  });
const ContentDiv = ({ info }) => {
  const { title, description, Images, updatedAt } = info;
  return (
    <div className="content_div_wrap">
      {Images[0] ? (
        <>
          <Link
            to={{ pathname: `/detail/${info.UserId}/${info.id}`, state: info }}
          >
            <img src={`http://211.193.71.154:8020/${Images[0].src}`} alt="" />

            <div>
              {title}{" "}
              <div>
                {ht(description).length > 60
                  ? `${ht(description).slice(0, 60)}...`
                  : ht(description)}
              </div>
              <div>{updatedAt.slice(0, 10)}</div>
            </div>
          </Link>
        </>
      ) : (
        <div>
          <Link
            to={{ pathname: `/detail/${info.UserId}/${info.id}`, state: info }}
          >
            {title}{" "}
            <div>
              {ht(description).length > 150
                ? `${ht(description).slice(0, 150)}...`
                : ht(description)}
            </div>
          </Link>
          <div>{updatedAt.slice(0, 10)}</div>
        </div>
      )}
    </div>
  );
};

export default ContentDiv;
import React from "react";
import { Link } from "react-router-dom";
import sanitize from "sanitize-html";
export const ht = (data) =>
  sanitize(data, {
    allowedTags: ["b", "i", "a"],
  });
const ContentDiv = ({ info }) => {
  const { title, description, Images, updatedAt } = info;
  // usePreloader({
  //   type: TEST_USER_POSTS_REQUEST,
  //   data: info,
  // });
  // console.log(test, "*(*(*");

  return (
    <div className="content_div_wrap">
      {Images[0] ? (
        <>
          <Link
            to={{
              pathname: `/detail/${info.UserId}/${info.id}`,
              state: { User: info },
            }}
          >
            {/* <img src={`http://localhost:8020/${Images[0].src}`} alt="" /> */}
            <img src={`http://localhost:8020/${Images[0].src}`} alt="" />

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
            to={{
              pathname: `/detail/${info.UserId}/${info.id}`,
              search: `?nick=${info.User.userId}`,
              state: { User: info },
            }}
          >
            {title}
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

export default React.memo(ContentDiv);

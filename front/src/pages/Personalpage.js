import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POSTS_REQUEST } from "../reducers/post";

import {
  SUBSCRIBE_USER_REQUEST,
  GET_USER_INFO_REQUEST,
} from "../reducers/user";
import "../css/personal.css";
import ContentDiv from "../component/Content_div";

import { ht } from "../component/Content_div";
import { usePreloader } from "../lib/PreloadContext";
import swal from "sweetalert";
const Personalpage = (props) => {
  const [pagingCount, setPagingCount] = useState(0);
  const { mainPost } = useSelector((state) => state.post);
  const { login, user, checkSubscribe } = useSelector((state) => state.user);
  const { userId } = props.match.params;
  let subsArr = [];
  let fullCount = Math.ceil(mainPost.pageCount / 3) | 0;
  console.log(props, "!!");
  const testPage = useCallback(() => {
    let arr = [];
    let totalPagecount = fullCount % 3 | 0;

    if (pagingCount + 3 >= fullCount) {
      arr = [...Array(3).keys()].map((v) => ++v + pagingCount);
      if (mainPost.pageCount === 0) {
        return [1];
      }
      if (totalPagecount === 0) return arr;
      Array(3 - totalPagecount)
        .fill(1)
        .forEach(() => arr.pop());
      return arr;
    } else {
      let arr = [...Array(3).keys()].map((v) => ++v + pagingCount);
      return arr;
    }
  }, [fullCount, mainPost.pageCount, pagingCount]);
  testPage();

  const plusBtn = useCallback(
    (e) => {
      if (e.target.dataset.direction === "left") {
        if (pagingCount - 3 < 0) return;
        setPagingCount((prev) => (prev -= 3));
      }
      if (e.target.dataset.direction === "right") {
        if (pagingCount + 3 >= fullCount) return;
        setPagingCount((prev) => (prev += 3));
      }
    },
    [fullCount, pagingCount]
  );

  if (user && user.subscribe) {
    user.subscribe.map((v) => {
      if (v.checked) subsArr.push(v.toUserNickname);
      return 0;
    });
  }
  const onClickPaging = (e) => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: { userId, count: e.target.innerHTML * 3 - 3 },
    });
  };

  const findPost_count = useCallback(() => {
    let hitarr = [];
    let finalarr = [];
    let findPost = [];
    mainPost.posts &&
      mainPost.posts.map(
        (v) =>
          v.PostCount &&
          hitarr.push({ id: v.PostCount.PostId, hit: v.PostCount.hit })
      );
    hitarr.sort((a, b) => b.hit - a.hit);
    finalarr = hitarr.slice(0, 3);

    findPost = finalarr.map((v) => mainPost.posts.filter((j) => j.id === v.id));
    return findPost;
  }, [mainPost]);

  findPost_count();

  const dispatch = useDispatch();
  const nick = mainPost.user && mainPost.user.nickname;
  usePreloader(() => {
    console.log(props, "##################");
    dispatch({
      type: GET_POSTS_REQUEST,
      data: { userId, count: 0 },
    });

    // dispatch({
    //   type: GET_USER_INFO_REQUEST,
    // });
  });
  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: { userId, count: 0 },
    });

    dispatch({
      type: GET_USER_INFO_REQUEST,
      data: userId,
    });
  }, [dispatch, userId]);

  const onClickSubscirbe = () => {
    if (!login) {
      swal("로그인 해주세요!!", "", "warning");
      return;
    }
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: {
        userId: props.location.state.user.userId,
        userNickname: props.location.state.user.nickname,
      },
    });
  };
  return (
    <div className="personal-wrapper">
      <div className="personal-header">
        <div className="user" style={{ marginRight: "10px" }}>
          <div className="user_inner">
            <img src="/images/aa.jpg" alt="" />
            <div>
              <strong>{nick}</strong>
              <br />
              <span>({mainPost.user && mainPost.user.userId})</span>
            </div>
            {(user && user.notSubsUser) ||
            (user && user.toSubscribe && user.toSubscribe.checked === false) ||
            checkSubscribe ? (
              <div className="btn_area nosub" disabled>
                <div>+</div> 이웃 신청중
              </div>
            ) : login ? null : subsArr.includes(nick) ||
              (user && user.userId === userId) ||
              (user && user.toSubscribe && user.toSubscribe.checked) ? null : (
              <div className="btn_area" onClick={onClickSubscirbe}>
                <div>+</div> 이웃추가
              </div>
            )}
          </div>
        </div>
        <div className="famous_posts-wrapper">
          <strong className="famous_posts-top strong-sect">TOP3</strong>

          <div className="famous_posts">
            {mainPost.countPost &&
              mainPost.countPost.map((v, i) => (
                <li key={v + i}>
                  {ht(v.description).length > 30
                    ? ht(v.description).slice(0, 31) + "..."
                    : ht(v.description)}
                </li>
              ))}
            {/* <ol>
              {findPost_count().map((v, i) => (
                <li key={v + i}>
                  {ht(v[0].description).length > 30
                    ? ht(v[0].description).slice(0, 31) + "..."
                    : ht(v[0].description)}
                </li>
              ))}
            </ol> */}
          </div>
        </div>
      </div>
      <div className="personal-content">
        <div className="personal-content_body">
          {mainPost.posts &&
            mainPost.posts.map((v, i) => <ContentDiv info={v} key={v + i} />)}
        </div>
      </div>
      <div className="paging-wrap">
        <div
          className="paging-arrow paging-btn"
          data-direction="left"
          onClick={plusBtn}
        >
          <img src="/images/left-arrow.png" alt="" data-direction="left" />
        </div>
        <div className="personal-pagingcount" onClick={onClickPaging}>
          {testPage().map((v, i) => (
            <div key={v} className="paging-btn" tabIndex="1">
              {v}
            </div>
          ))}
        </div>
        <div
          className="paging-arrow paging-btn"
          data-direction="right"
          onClick={plusBtn}
        >
          <img src="/images/right-arrow.png" alt="" data-direction="right" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Personalpage);

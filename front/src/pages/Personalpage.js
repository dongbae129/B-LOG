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
const Personalpage = (props) => {
  const { mainPost } = useSelector((state) => state.post);
  const { login, user } = useSelector((state) => state.user);
  const { userId } = props.match.params;
  console.log(props, "@@");

  let subsArr = [];
  if (user && user.subscribe) {
    user.subscribe.map((v) => subsArr.push(v.userNickname));
  }
  const onClickPaging = (e) => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: { userId, count: e.target.innerHTML * 9 - 9 },
    });
  };

  let fullCount = Math.ceil(mainPost.pageCount / 9) | 0;
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
  // if (mainPost.length > 0) {
  //   findPost_count();
  // }
  findPost_count();

  const dispatch = useDispatch();
  const nick = mainPost.user && mainPost.user.nickname;
  usePreloader(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
      data: { userId, count: 0 },
    });

    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
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
      alert("로그인 해주세요!!");
      return;
    }
    dispatch({
      type: SUBSCRIBE_USER_REQUEST,
      data: userId,
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
            {subsArr.includes(nick) ||
            (user && user.userId === userId) ||
            (user && user.toSubscribe) ? null : (
              <div className="btn_area" onClick={onClickSubscirbe}>
                <span>+</span> 이웃추가
              </div>
            )}
          </div>
        </div>
        <div className="famous_posts-wrapper">
          <strong className="famous_posts-top strong-sect">TOP3</strong>

          <div
            className="famous_posts"
            // style={{ width: "600px", border: "1px solid black" }}
          >
            <ol>
              {findPost_count().map((v, i) => (
                <li key={v + i}>
                  {ht(v[0].description).length > 30
                    ? ht(v[0].description).slice(0, 31) + "..."
                    : ht(v[0].description)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="personal-content">
        {/* <div className="personal-content_sublist">
          {user && <SubscribeList st={user} />}
        </div> */}
        <div className="personal-content_body">
          {mainPost.posts &&
            mainPost.posts.map((v, i) => (
              <ContentDiv info={v} key={v + i} />
              // <Detail props={v} key={v + i} />
            ))}
        </div>
      </div>
      <div className="personal-pagingcount" onClick={onClickPaging}>
        {Array(fullCount)
          .fill(1)
          .map((v, i) => (
            <div key={i} tabIndex="1">
              {i + 1}
            </div>

            // <div key={i} onClick={onClickPaging}>
            //   {paging ? <div className="paging">{i + 1}</div> : i + 1}
            // </div>
          ))}
      </div>
    </div>
  );
};

export default Personalpage;

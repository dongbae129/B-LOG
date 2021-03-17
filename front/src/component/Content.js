import React, { useEffect, useRef } from "react";
import "../css/content.css";
import Detail from "./Detail";
import { useSelector, useDispatch } from "react-redux";
import { GET_USER_POSTS_REQUEST } from "../reducers/post";
import { usePreloader } from "../lib/PreloadContext";
import { useCallback } from "react";

const Content = () => {
  const { mainPost, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);
  let servertest = useRef(false);

  const onScroll = useCallback(() => {
    console.log(
      window.scrollY + document.documentElement.clientHeight,
      document.documentElement.scrollHeight - 300
    );
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPost[0] && mainPost[mainPost.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: GET_USER_POSTS_REQUEST,
            lastId,
          });
          console.log("33");
        }
        countRef.current.push(lastId);
      }
    }
  }, [dispatch, hasMorePost, mainPost]);
  usePreloader(() => {
    dispatch({
      type: GET_USER_POSTS_REQUEST,
    });
    servertest.current = true;
    console.log(servertest.current, "@");
    console.log("11");
  });

  useEffect(() => {
    if (mainPost.length === 0 || mainPost.posts) {
      dispatch({
        type: GET_USER_POSTS_REQUEST,
      });
    }
    console.log(servertest.current, "@!");
    console.log("22");
  }, [dispatch, mainPost.length, mainPost.posts]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div className="content-wrap">
      {mainPost.map && mainPost.map((v, i) => <Detail props={v} key={v + i} />)}
    </div>
  );
};

export default React.memo(Content);

import React, { useEffect, useRef } from "react";
import "../css/content.css";
import Detail from "./Detail";
import { useSelector, useDispatch } from "react-redux";
import { GET_POSTS_REQUEST } from "../reducers/post";
import { usePreloader } from "../lib/PreloadContext";
import { useCallback } from "react";

const Content = () => {
  const { mainPost, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  console.log(hasMorePost, "$$$");

  // console.log(mainPost[mainPost.length - 1].id, "()()(");
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      console.log("EWGEWGEW");
      console.log(hasMorePost, ")))");
      if (hasMorePost) {
        const lastId = mainPost[mainPost.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: GET_POSTS_REQUEST,
            lastId,
          });
        }
        countRef.current.push(lastId);
      }
    }
  }, [dispatch, hasMorePost, mainPost]);
  usePreloader(() => {
    let date = new Date();
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    console.log("server", date.getTime());
  });

  useEffect(() => {
    let date2 = new Date();
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    console.log("client", date2.getTime());
    console.log("11111");
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    console.log("22222");
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div className="content-wrap">
      {mainPost.map && mainPost.map((v, i) => <Detail props={v} key={v + i} />)}
    </div>
  );
};

export default Content;

import React, { useEffect } from "react";
import "../css/content.css";
import Detail from "./Detail";
import { useSelector, useDispatch } from "react-redux";
import { GET_POSTS_REQUEST } from "../reducers/post";
import { usePreloader } from "../lib/PreloadContext";

const Content = () => {
  const { mainPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

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
  }, [dispatch]);

  return (
    <div className="content-wrap">
      {mainPost.map && mainPost.map((v, i) => <Detail props={v} key={v + i} />)}
    </div>
  );
};

export default Content;

import React, { useEffect } from "react";
import "../css/content.css";
import Detail from "./Detail";
import { useSelector, useDispatch } from "react-redux";
import { GET_POSTS_REQUEST } from "../reducers/post";

const Content = () => {
  const { mainPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_POSTS_REQUEST,
    });
  }, [dispatch]);

  return (
    <div className="content-wrap">
      {mainPost.map && mainPost.map((v, i) => <Detail props={v} key={v + i} />)}
    </div>
  );
};

export default Content;

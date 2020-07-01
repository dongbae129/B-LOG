import React from "react";
import "../css/content.css";
import Detail from "./Detail";
const dummy = [
  {
    title: "제목1",
    name: "작성자",
    time: "시간",
    hash: "#해쉬태그",
    descrip: "내용",
  },
  {
    title: "제목2",
    name: "작성자",
    time: "시간",
    hash: "#해쉬태그",
    descrip: "내용",
  },
  {
    title: "제목3",
    name: "작성자",
    time: "시간",
    hash: "#해쉬태그",
    descrip: "내용",
  },
];
const Content = () => {
  return (
    <div className="content-wrap">
      {dummy.map((v) => (
        <Detail props={v} />
      ))}
    </div>
  );
};

export default Content;

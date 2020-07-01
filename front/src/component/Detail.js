import React from "react";
import { Link, Route } from "react-router-dom";

const Detailpage = ({ props }) => {
  return (
    <div className="content">
      <h2>{props.title}</h2>
      <span>{props.name}</span>
      <span>{props.time}</span>
      <p>{props.hash}</p>
      <div>{props.descrip}</div>
    </div>
  );
};

export default Detailpage;

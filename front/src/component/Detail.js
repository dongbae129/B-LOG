import React from "react";
import { Link, Route } from "react-router-dom";
import Detailpage from "../pages/Detailpage";

const Detail = ({ props }) => {
  return (
    <div className="content">
      <h2>{props.title}</h2>
      <span>{props.name}</span>
      <span>{props.time}</span>
      <p>{props.hash}</p>

      <Link to={{ pathname: "/detail", props }}>
        <div>{props.descrip}</div>
      </Link>
    </div>
  );
};

export default Detail;

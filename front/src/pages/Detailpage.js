import React from "react";

const Detailpage = (props) => {
  const { title, name, time, hash, descrip } = props.location.props;
  return (
    <div>
      <h2>{title}</h2>
      <span>{name}</span>
      <span>{time}</span>
      <p>{hash}</p>
      <div>{descrip}</div>
    </div>
  );
};

export default Detailpage;

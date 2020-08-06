import React from "react";
import { Card, Badge } from "react-bootstrap";
const Task = (props) => {
  const badges = {
    Normal: "success",
    Important: "warning",
    Urgent: "danger",
  };
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    var my_obj_str = JSON.stringify(props.value);
    e.dataTransfer.setData("card_value", my_obj_str);
    console.log(target.id);
    // setTimeout(() => {
    //   target.style.display = "none";
    // }, 0);
  };
  const dragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <Card
      border={badges[`${props.value.Severity}`]}
      className={`task-card ${badges[`${props.value.Severity}`]}`}
      draggable="true"
      id={props.id}
      value={props.value}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <div className="d-flex flex-row-reverse">
        <Badge className="badge" variant={badges[`${props.value.Severity}`]}>
          <h6>{props.value.Severity}</h6>
        </Badge>
      </div>
      <div className="d-flex flex-row">
        <h4>
          <b>{props.value.name}</b>
        </h4>
      </div>
      <div className="d-flex flex-row-reverse">
        <h6>{props.value.date}</h6>
      </div>
    </Card>
  );
};
export default Task;

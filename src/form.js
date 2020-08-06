import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { TaskContext } from "./taskContext";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const TaskForm = (props) => {
  const [tasks, setTasks] = useContext(TaskContext);
  const onSubmit = (data, e) => {
    console.log(data);
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var d = new Date(data.date);
    var day = d.getDay() + 2;
    var month = d.getMonth();
    const task = {
      name: data.name,
      Description: data.description,
      Severity: data.severity,
      date:
        days[day - 2] + " " + months[month] + " " + day + " " + d.getFullYear(),
      type: props.value.type,
      id: tasks.length + 1,
    };

    setTasks([...tasks, task]);
    e.target.reset();
  };
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className="form" id={props.value.type}>
      <form className="d-flex flex-column " onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>

        <input
          ref={register({ required: true, minLength: 2 })}
          className={errors.name ? "has-error" : ""}
          id="name"
          name="name"
        />
        {errors.name && (
          <p>
            *
            {errors.name.type === "required"
              ? "Required"
              : errors.name.type === "minLength"
              ? "Name is too short"
              : ""}
          </p>
        )}
        <label>Description</label>
        <textarea
          name="description"
          id="desc"
          ref={register({ required: true })}
        />
        {errors.description &&
          errors.description.type === "required" &&
          (document.getElementById("desc").style.outlineColor = "red") && (
            <p className="red">* Description is empty</p>
          )}

        <label>Severity</label>
        <select
          id="severity"
          className="form-control"
          name="severity"
          ref={register({ required: true })}
        >
          <option value="Normal">Normal</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
        </select>
        <label>Date</label>
        <input
          type="date"
          name="date"
          ref={register({ required: true })}
        ></input>
        <div className=" d-flex justify-content-end">
          <Button type="submit" variant="primary">
            Add
          </Button>
          <Button variant="outline-secondary light " data-dismiss="modal">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;

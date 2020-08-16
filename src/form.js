import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { TaskContext } from "./taskContext";
import firebase from "./firebase";

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
const TaskForm = (props, id) => {
  const {
    value,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
  } = useContext(TaskContext);
  const [tasks, setTasks] = value;
  const [editId, setEditId] = value3;
  const [taskType, setTaskType] = value5;
  const [showToast, setShowToast] = value6;
  const [showModal, setShowModal] = value7;
  const [showModalAdd, setShowModalAdd] = value8;

  const onSubmit = (data, e) => {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var d = new Date(data.date);
    var day = d.getDay() + 2;
    var month = d.getMonth();

    const task = {
      name: data.name,
      Description: data.description,
      Severity: data.severity,
      date:
        props.value.function === "edit"
          ? editId.date
          : days[day - 2] +
            " " +
            months[month] +
            " " +
            day +
            " " +
            d.getFullYear(),
      type: props.value.function === "add" ? taskType : editId.type,

      id:
        props.value.function === "add"
          ? JSON.parse(localStorage.getItem("ids")) + ""
          : editId.id,
    };
    if (props.value.function === "add") {
      setShowModalAdd(false);

      setTasks([...tasks, task]);
      //      dispatch({ type: "ADD_TASK", user: user, task: task });
      console.log("tasks", tasks);
      var userTasks = firebase.db
        .collection("users")
        .doc(`${firebase.getCurrentUserId()}`);
      localStorage.setItem(
        "ids",
        JSON.stringify(1 + JSON.parse(localStorage.getItem("ids")))
      );

      e.target.reset();

      return userTasks
        .update({
          tasks: [...tasks, task],
        })
        .then(function () {
          setShowToast({ show: true, message: "Added Successfully" });
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    } else if (props.value.function === "edit") {
      console.log("edit", task);
      setShowModal(false);
      const neww = tasks.filter((t) => {
        return t.id !== task.id;
      });
      e.target.reset();
      setTasks([...neww, task]);
      setEditId(task);
      var userTasks = firebase.db
        .collection("users")
        .doc(`${firebase.getCurrentUserId()}`);

      return userTasks
        .update({
          tasks: [...neww, task],
        })
        .then(function () {
          setShowToast({ show: true, message: "Edited Succesfully" });
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    }

    e.target.reset();
  };
  const error = (type, message) => {
    return (
      <p>
        *
        {errors[type].type === "required"
          ? "Required"
          : errors[type].type === "minLength"
          ? `${type} is too short`
          : errors[type].type === "validate"
          ? `Invalid Email`
          : ""}
      </p>
    );
  };
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className="form" id={props.id}>
      <form
        className="d-flex flex-column "
        onSubmit={handleSubmit(onSubmit)}
        key={props.id}
      >
        <label>Name</label>

        <input
          ref={register({ required: true, minLength: 2 })}
          className={errors.name ? "has-error" : ""}
          key={props.value.id}
          id={props.value.id}
          name="name"
          defaultValue={props.value.function === "edit" ? editId.name : ""}
        />
        {/* {errors.name && (
          <p>
            *
            {errors.name.type === "required"
              ? "Required"
              : errors.name.type === "minLength"
              ? "Name is too short"
              : ""}
          </p>
        )} */}
        {errors.name && error("name", "Name")}

        <label>Description</label>
        <textarea
          className={errors.description ? "has-error" : ""}
          id="desc"
          name="description"
          defaultValue={props.value.task ? editId.Description : ""}
          ref={register({ required: true })}
        />
        {/* {errors.description &&
          errors.description.type === "required" &&
          (document.getElementById("desc").style.outlineColor = "red") && (
            <p className="red">* Description is empty</p>
          )} */}
        {errors.description && error("description", "Description")}

        <label>Severity</label>
        <select
          id="severity"
          className="form-control"
          name="severity"
          ref={register({ required: true })}
          // defaultValue={props.value.task ? editId.Severity : ""}
        >
          <option
            value="Normal"
            selected={editId.Severity === "Normal" ? "selected" : ""}
          >
            Normal
          </option>
          <option
            value="Important"
            selected={editId.Severity === "Important" ? "selected" : ""}
          >
            Important
          </option>
          <option
            value="Urgent"
            selected={editId.Severity === "Urgent" ? "selected" : ""}
          >
            Urgent
          </option>
        </select>
        {props.value.function === "add" && <label>Date</label>}
        {props.value.function === "add" && (
          <input
            type="date"
            name="date"
            ref={register({ required: true })}
          ></input>
        )}
        <div className=" d-flex justify-content-end">
          <Button type="submit" variant="primary" id="submitt">
            {props.value.function === "add" ? "Add" : "Edit"}
          </Button>

          <Button
            variant="outline-secondary light "
            onClick={() => {
              setShowModal(false);
              setShowModalAdd(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;

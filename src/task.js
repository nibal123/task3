import React, { useContext, useState, useRef, useEffect } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";
import { TaskContext } from "./taskContext";
import TaskForm from "./form";
import firebase from "./firebase";
import Dropdown from "react-bootstrap/Dropdown";
const Task = (props, archivedTask) => {
  const inputRef = useRef(null);
  const [isDragged, setDragged] = useState(false);
  const badges = {
    Normal: "success",
    Important: "warning",
    Urgent: "danger",
  };
  const { value, value2, value3, value4, value5, value6, value7 } = useContext(
    TaskContext
  );
  const [tasks, setTasks] = value;
  const [archived, setArchived] = value2;
  const [editId, setEditId] = value3;
  const [showToast, setShowToast] = value6;
  const [modalShow, setModalShow] = value7;
  const [showModal, setshowModal] = useState(false);
  const handleClose = () => setshowModal(false);
  const handleshowModal = () => setshowModal(true);

  const dragStart = (e) => {
    localStorage.setItem("draggedId", props.id);
    setDragged(true);
    const target = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("card_id", target.id);
    var my_obj_str = JSON.stringify(props.value);
    e.dataTransfer.setData("card_value", my_obj_str);
    //console.log(target.id);
    e.dataTransfer.setData(" ", target.id);
  };
  const dragOver = (e) => {
    e.stopPropagation();
    setDragged(false);
  };

  //const [modal, setModal] = useState(<></>);
  const edit = () => {
    // console.log("taskkk", props.value);
    // setModal(<Modal>{props}</Modal>);
    // console.log(modal);
    console.log(props.value);
    setEditId(props.value);
    setModalShow(true);
  };
  const deleteTask = () => {
    const neww = tasks.filter((t) => {
      return t.id !== props.id;
    });
    setTasks([...neww]);
    var userTasks = firebase.db
      .collection("users")
      .doc(`${firebase.getCurrentUserId()}`);

    return userTasks
      .update({
        tasks: [...neww],
      })
      .then(function () {
        setShowToast({ show: true, message: "Deleted Succesfully" });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // localStorage.setItem("tasks", JSON.stringify([...neww]));
  };
  const deleteArchived = () => {
    const neww = archived.filter((t) => {
      return t.id !== props.id;
    });
    setArchived([...neww]);
    var userTasks = firebase.db
      .collection("users")
      .doc(`${firebase.getCurrentUserId()}`);

    return userTasks
      .update({
        archived: [...neww],
      })
      .then(function () {
        setShowToast({ show: true, message: "Deleted Succesfully" });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // localStorage.setItem("archived", JSON.stringify([...neww]));
  };
  const archive = () => {
    const neww = tasks.filter((t) => {
      return t.id !== props.id;
    });
    setTasks([...neww]);
    setArchived([...archived, props.value]);
    // localStorage.setItem("tasks", JSON.stringify([...neww]));
    var userTasks = firebase.db
      .collection("users")
      .doc(`${firebase.getCurrentUserId()}`);
    return userTasks
      .update({
        tasks: [...neww],
        archived: [...archived, props.value],
      })
      .then(function () {
        setShowToast({ show: true, message: "Moved to Archive" });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    // localStorage.setItem(
    //   "archived",
    //   JSON.stringify([...archived, props.value])
    // );
  };
  const returnTask = () => {
    const neww = archived.filter((t) => {
      return t.id !== props.id;
    });
    setArchived([...neww]);
    setArchived([...archived, props.value]);
    // localStorage.setItem("tasks", JSON.stringify([...neww]));
    var userTasks = firebase.db
      .collection("users")
      .doc(`${firebase.getCurrentUserId()}`);
    return userTasks
      .update({
        tasks: [...tasks, props.value],
        archived: [...neww],
      })
      .then(function () {
        setShowToast({ show: true, message: "Moved to Tasks" });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  useEffect(() => {
    inputRef.current.focus();
    // console.log(props.id + "kk");
  }, []);
  return (
    <div>
      <Card
        border={badges[`${props.value.Severity}`]}
        className={
          props.archivedTask
            ? `task-card archived ${badges[`${props.value.Severity}`]} `
            : `task-card ${badges[`${props.value.Severity}`]} `
        }
        draggable={props.archivedTask ? "false" : "true"}
        id={props.id}
        value={props.value}
        onDragStart={dragStart}
        onDragOver={dragOver}
        droppable="true"
        ref={inputRef}
        onDragEnter={() => {
          if (!isDragged) {
            console.log(
              props.id + "dropppe" + localStorage.getItem("draggedId")
            );
            var dragged;
            tasks.map((t) => {
              if (t.id == localStorage.getItem("draggedId")) {
                dragged = t;
              }
            });
            console.log("dragged", dragged);
            localStorage.setItem("draggedTask", JSON.stringify(dragged));
            localStorage.setItem("dropped", props.id);
            console.log("dopped", props.value);
            var indexx;
            tasks.map((t, index) => {
              if (t.id == props.id) {
                indexx = index;
              }
            });
            console.log(indexx);
            const newTasks = tasks.filter((t) => {
              return t.id != localStorage.getItem("draggedId");
            });
            newTasks.splice(indexx, 0, dragged);
            setTasks(newTasks);
            var userTasks = firebase.db
              .collection("users")
              .doc(`${firebase.getCurrentUserId()}`);
            return userTasks
              .update({
                tasks: [...newTasks],
              })
              .then(function () {
                console.log("Document successfully updated!");
              })
              .catch(function (error) {
                console.error("Error updating document: ", error);
              });
            // localStorage.setItem("tasks", JSON.stringify([...newTasks]));
          }
        }}
      >
        <div className="d-flex flex-row-reverse">
          {" "}
          <Dropdown>
            <Dropdown.Toggle
              variant="border-light"
              id="dropdown-basic"
              className="add"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                {
                  <Button
                    onClick={props.archivedTask ? deleteArchived : deleteTask}
                    className="dropdown-button"
                  >
                    Delete
                  </Button>
                }
              </Dropdown.Item>
              <Dropdown.Item>
                {props.archivedTask && (
                  <Button onClick={returnTask} className="dropdown-button">
                    Return Task
                  </Button>
                )}
              </Dropdown.Item>
              <Dropdown.Item>
                {!props.archivedTask && (
                  <Button onClick={archive} className="dropdown-button">
                    Archive
                  </Button>
                )}
              </Dropdown.Item>
              <Dropdown.Item>
                {" "}
                {!props.archivedTask && (
                  <Button
                    data-toggle="modal"
                    data-target=".bd-edit-modal-sm"
                    onClick={edit}
                    className="dropdown-button"
                  >
                    Edit
                  </Button>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <div
            className="modal fade bd-edit-modal-sm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="mySmallModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <h2>
                  <b>Edit Task</b>
                </h2>

                // <TaskForm
                //   id={`form${props.id}`}
                //   value={{
                //     type: props.id,
                //     severity: props.value.Severity,
                //     function: "edit",
                //     task: props.value,
                //   }}
                //   key={`form${props.id}`}
                // ></TaskForm>
              </div>
            </div>
          </div> */}
          <div onClick={handleshowModal}>
            <Badge
              className="badge"
              variant={badges[`${props.value.Severity}`]}
            >
              <h6>{props.value.Severity}</h6>
            </Badge>
          </div>
        </div>
        <div onClick={handleshowModal}>
          <div className="d-flex flex-row">
            <h4>
              <b>{props.value.name}</b>
            </h4>
          </div>
          <div className="d-flex flex-row-reverse">
            <h6>{props.value.date}</h6>
          </div>
        </div>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              <b>{props.value.name}</b>
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{props.value.Description}</h3>
        </Modal.Body>
        <Modal.Body>Added on : {props.value.date}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Edit Task</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            id={`form${props.id}`}
            value={{
              type: props.id,
              severity: props.value.Severity,
              function: "edit",
              task: props.value,
            }}
            key={`form${props.id}`}
          ></TaskForm>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Task;

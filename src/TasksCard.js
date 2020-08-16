import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Task from "./task";
import { TaskContext } from "./taskContext";
import TaskForm, { months } from "./form";
import firebase from "./firebase";
const TasksCard = (props) => {
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
  const [taskType, setTaskType] = value5;
  const [modalShowAdd, setModalShowAdd] = value8;
  const [isDropped, setIsDropped] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(() => {
      setIsDropped(false);
    }, 50);
  }, [isDropped]);
  const drop = (e) => {
    var x = document.getElementById(props.id);
    x.setAttribute("className", "card-main");
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    setIsDropped(false);

    const task = JSON.parse(e.dataTransfer.getData("card_value"));

    task.type = props.id;
    var dropped = localStorage.getItem("dropped");
    var indexx;
    tasks.map((t, index) => {
      if (t.id == dropped) {
        indexx = index;
      }
    });
    console.log(indexx);

    var newTasks = tasks.filter((t) => {
      return t.id !== task.id;
    });

    newTasks.splice(indexx, 0, task);

    setTasks(newTasks);
    //  localStorage.setItem("tasks", JSON.stringify([...newTasks]));
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
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  const updateTasks = (target, tasks) => {
    const updatedTasks = {
      [target]: [...tasks],
    };
  };

  const dragOver = (e) => {
    e.preventDefault();
    setIsDropped(true);

    //const draggable = document.querySelector("task-card");
  };

  const severity = {
    Urgent: -1,
    Important: 0,
    Normal: 1,
  };
  const [sortType, setSort] = useState("");
  tasks.sort(compare);

  function compare(a, b) {
    switch (sortType) {
      case "alphabet": {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }

        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      }
      case "severity": {
        if (severity[`${a.Severity}`] > severity[`${b.Severity}`]) {
          return 1;
        }
        if (severity[`${a.Severity}`] < severity[`${b.Severity}`]) {
          return -1;
        }
        return 0;
      }
      case "time": {
        var date1 = a.date.split(" ");
        var date2 = b.date.split(" ");

        if (date2[3] > date1[3]) {
          return -1;
        } else if (date2[3] < date1[3]) {
          return 1;
        } else if (months.indexOf(date2[1]) < months.indexOf(date1[1]))
          return 1;
        else if (months.indexOf(date2[1]) > months.indexOf(date1[1])) return -1;
        else if (parseInt(date2[2]) < parseInt(date1[2])) {
          return 1;
        } else if (parseInt(date2[2]) > parseInt(date1[2])) {
          return -1;
        }
        break;
      }

      default:
        return 0;
    }
  }

  const [dropdownOpen, setOpen] = useState(false);

  return (
    <Card
      className={!isDropped ? "card-main" : "card-yellow"}
      onPointerUp={() => {
        setIsDropped(true);
      }}
      border="primary"
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      droppable="true"
    >
      <div className="card-header row">
        <div className="col-5">{props.value.name}</div>
        <div className="col">
          {" "}
          <select
            id={`new${props.id}`}
            className="add"
            onChange={() => {
              setSort(document.getElementById(`new${props.id}`).value);
            }}
          >
            <option value="" disabled selected>
              Sort By
            </option>
            <option value="time">Time Added</option>
            <option value="severity">Severity</option>
            <option value="alphabet">A-Z</option>
          </select>
        </div>
      </div>
      <div className="card-body" key={props.id} id={props.id}>
        {tasks.map((t) => {
          if (props.id === t.type)
            return (
              <Task value={t} id={t.id} key={t.id} archivedTask={false}></Task>
            );
          return "";
        })}

        <div>
          <Button
            variant="outline-secondary"
            className="add"
            onClick={() => {
              setModalShowAdd(true);
              setTaskType(props.id);
            }}
          >
            ADD TASK +
          </Button>

          <Modal
            show={modalShowAdd}
            onHide={() => {
              setModalShowAdd(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2>Add Task</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TaskForm
                id={props.id}
                value={{ type: props.id, function: "add" }}
              ></TaskForm>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Card>
  );
};

export default TasksCard;

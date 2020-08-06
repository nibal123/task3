import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import Task from "./task";
import { TaskContext } from "./taskContext";
import TaskForm, { months } from "./form";

const TasksCard = (props) => {
  const [tasks] = useContext(TaskContext);

  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
  };
  const dragOver = (e) => {
    e.preventDefault();
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
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

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
      }
      default:
        return 0;
    }
  }

  //   var e = document.getElementById("sortBy");
  //   var strUser = e.options[e.selectedIndex].value;
  //   console.log(strUser);
  return (
    <Card
      className="card-main"
      border="primary"
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
    >
      <div className="card-header row">
        <div className="col-5">{props.value.name}</div>
        <div className="col">
          {" "}
          <select
            id="sortBy"
            onChange={() => {
              setSort(document.getElementById("sortBy").value);
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
        {tasks.sort().map((t) => {
          if (props.id === t.type)
            return <Task value={t} id={t.id} key={t.id}></Task>;
        })}
        {props.id === "toDo" ? (
          <Card className="card-add" id={props.id}>
            <span>
              {" "}
              Add Task
              <button
                type="button"
                variant="primary"
                data-toggle="modal"
                data-target=".bd-example-modal-sm"
                type="button"
                className="btn btn-default btn-circle"
              >
                +
              </button>
              <div
                className="modal fade bd-example-modal-sm"
                tabindex="-1"
                role="dialog"
                aria-labelledby="mySmallModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <h2>
                      <b>Add Task</b>
                    </h2>
                    <TaskForm
                      id={props.id}
                      value={{ type: props.id }}
                    ></TaskForm>
                  </div>
                </div>
              </div>
            </span>
          </Card>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default TasksCard;

import React from "react";
import "./App.css";
import TasksCard from "./TasksCard";
import { TasksProvider } from "./taskContext";

import Nav from "./nav";

function App() {
  return (
    <TasksProvider>
      <div className="App">
        <Nav></Nav>
        <div className="row">
          <div className="col-4">
            {" "}
            <TasksCard value={{ name: "To Do" }} id="toDo"></TasksCard>
          </div>
          <div className="col-4">
            {" "}
            <TasksCard
              value={{ name: "In Progress" }}
              id="inProgress"
            ></TasksCard>
          </div>
          <div className="col-4">
            {" "}
            <TasksCard value={{ name: "Done" }} id="done"></TasksCard>
          </div>
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;

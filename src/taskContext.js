import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TasksProvider = (props) => {
  const [tasks, setTasks] = useState([
    {
      name: "Task #1",
      Description: "task1",
      Severity: "Normal",
      date: "Wed Aug 05 2020",
      type: "toDo",
      id: "1",
    },
    {
      name: "zask #7",
      Description: "task1",
      Severity: "Urgent",
      date: "Wed Aug 07 2020",
      type: "inProgress",
      id: "7",
    },
    {
      name: "Z #1",
      Description: "task1",
      Severity: "Urgent",
      date: "Wed Mar 05 2020",
      type: "toDo",
      id: "4",
    },
    {
      name: "G",
      Description: "task1",
      Severity: "Urgent",
      date: "Wed Mar 1 2020",
      type: "toDo",
      id: "6",
    },
    {
      name: "Ab #1",
      Description: "task1",
      Severity: "Important",
      date: "Wed Aug 05 2018",
      type: "toDo",
      id: "5",
    },
    {
      name: "Task #2",
      Description: "task2",
      Severity: "Urgent",
      date: "Wed Aug 05 2020",
      type: "inProgress",
      id: "2",
    },

    {
      name: "Task #3",
      Description: "task3",
      Severity: "Important",
      date: "Wed Aug 05 2020",
      type: "done",
      id: "3",
    },
  ]);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      {" "}
      {props.children}
    </TaskContext.Provider>
  );
};

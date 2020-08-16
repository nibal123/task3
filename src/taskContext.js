import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TasksProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [archived, setArchived] = useState([]);
  const [editId, setEditId] = useState({
    name: "",
    Description: "",
    Severity: "",
    type: "",
    id: "",
    date: "",
  });
  const [userPassword, setUserPassword] = useState("");
  const [taskType, setTaskType] = useState();
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [modalShow, setModalShow] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  return (
    <TaskContext.Provider
      value={{
        value: [tasks, setTasks],
        value2: [archived, setArchived],
        value3: [editId, setEditId],
        value4: [userPassword, setUserPassword],
        value5: [taskType, setTaskType],
        value6: [showToast, setShowToast],
        value7: [modalShow, setModalShow],
        value8: [modalShowAdd, setModalShowAdd],
      }}
    >
      {" "}
      {props.children}
    </TaskContext.Provider>
  );
};

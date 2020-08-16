import React, { useEffect, useState, useContext } from "react";
import TasksCard from "./TasksCard";
import { TaskContext } from "./taskContext";
import { useHistory } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Archived from "./archived";
import Nav from "./nav";
import firebase from "./firebase";
import Loader from "./loader";
import Toastt from "./toast";
const Home = (props) => {
  const history = useHistory();
  const { value, value2, value3, value4, value5, value6 } = useContext(
    TaskContext
  );
  const [tasks, setTasks] = value;
  const [archived, setArchived] = value2;
  const [name, setName] = useState("");
  const [load, setLoad] = useState(true);
  const [showToast, setShowToast] = value6;
  if (!firebase.getCurrentUsername()) {
    alert("Please login first");
    history.push("/login");
  }

  setTimeout(() => {
    setLoad(false);
  }, 600);

  useEffect(
    () => {
      // console.log("user", firebase.getCurrentUserId());
      // console.log(firebase.database());
      setName(firebase.getCurrentUsername());
      // console.log(name);
      // console.log(
      //   firebase.getUserTasks().then((data) => {
      //     console.log(data);
      //   })
      // );
      var docRef = firebase.db
        .collection("users")
        .doc(`${firebase.getCurrentUserId()}`);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // console.log("Document data:", doc.data().tasks);
            setTasks(doc.data().tasks);
            setArchived(doc.data().archived);
          } else {
            firebase.setUserDataBase(firebase.getCurrentUserId());
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
    [tasks],
    [archived]
  );

  return (
    <div className="App">
      {load ? (
        <div id="loader" className="load">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <div className="body-task">
            <Nav></Nav>

            <div className="row relative">
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
            <div className="absolute">
              <Toastt>{showToast}</Toastt>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "./taskContext";
import Task from "./task";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";
import Nav from "./nav";
import Loader from "./loader";
import Toastt from "./toast";
const Archived = () => {
  const history = useHistory();
  const { value, value2, value3, value4, value5, value6 } = useContext(
    TaskContext
  );
  const [tasks, setTasks] = value;
  const [archived, setArchived] = value2;
  const [showToast, setShowToast] = value6;

  const [load, setLoad] = useState(true);

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

  // var docRef = firebase.db
  //   .collection("users")
  //   .doc(`${firebase.getCurrentUserId()}`);

  // docRef.get().then(function (doc) {
  //   if (doc.exists) {
  //     //   console.log("Document data:", doc.data().tasks);
  //     if (doc.data.archived) console.log(doc.data.archived);
  //   }
  // });

  return (
    <>
      {load ? (
        <div id="loader" className="load">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <Nav></Nav>
          <div className="relative">
            {archived.map((t) => {
              return (
                <Task value={t} id={t.id} key={t.id} archivedTask="true"></Task>
              );
            })}
          </div>
          <div className="absolute">
            <Toastt>{showToast}</Toastt>
          </div>
        </>
      )}
    </>
  );
};
export default Archived;

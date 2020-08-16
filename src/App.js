import React, { useState, useEffect } from "react";
import "./App.css";
import { TasksProvider } from "./taskContext";
import Login from "./login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home";
import SignUp from "./signup";
import firebase from "./firebase";
import Loader from "./loader";
import Archived from "./archived";
function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setTimeout(() => {
        setFirebaseInitialized(val);
      }, 100);
    });
  });

  return firebaseInitialized !== false ? (
    <TasksProvider>
      <Router>
        <Switch>
          <Route path="/signup" exact component={SignUp}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/archived" component={Archived}></Route>
        </Switch>
      </Router>
    </TasksProvider>
  ) : (
    <div id="loader" className="load">
      <Loader></Loader>
    </div>
  );
}

export default App;

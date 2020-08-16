import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";
import { TaskContext } from "./taskContext";

const Login = (props) => {
  const history = useHistory();

  const { value, value2, value3, value4 } = useContext(TaskContext);
  const [tasks, setTasks] = value;
  const [archived, setArchived] = value2;
  const [userPassword, setUserPassword] = value4;
  const { register, handleSubmit, errors } = useForm();

  async function login(data) {
    try {
      await firebase.login(data.email, data.password).then(() => {
        setUserPassword(data.password);

        var docRef = firebase.db
          .collection("users")
          .doc(`${firebase.getCurrentUserId()}`);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setTasks(doc.data().tasks);
              setArchived(doc.data().archived);
            } else {
              firebase.setUserDataBase(firebase.getCurrentUserId());
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      });

      history.push("./home");
    } catch (error) {
      alert(error.message);
    }
  }
  const onSubmit = (data, e) => {
    console.log(data);
    login(data);
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
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  return (
    <div className="login">
      <div className="row ">
        <div className="col-6">
          <h1>Login</h1>
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                ref={register({
                  required: true,
                  minLength: 2,
                  validate: (input) => validateEmail(input),
                })}
                className={errors.email ? "has-error" : ""}
                placeholder="Email"
                name="email"
              />
              {errors.email && error("email", "")}

              <input
                type="password"
                ref={register({ required: true, minLength: 5 })}
                className={errors.password ? "has-error" : ""}
                name="password"
                placeholder="Password"
              />
              {errors.password && error("password", "")}
              <Button type="submit" variant="primary">
                Login
              </Button>
              <a href="/signup">Create New Account</a>
              {error}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

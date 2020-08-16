import React, { useState, useContext } from "react";
import firebase from "./firebase";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { TaskContext } from "./taskContext";
const Nav = () => {
  const { value, value2, value3, value4, value5, value6 } = useContext(
    TaskContext
  );
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = value6;
  const [userPassword, setUserPassword] = value4;
  const [archived, setArchived] = value2;
  const { register, handleSubmit, errors } = useForm();
  const [pass, setPass] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  function logout() {
    firebase.logout();
    history.push("/login");
  }

  const gotoTasks = () => {
    history.push("./home");
  };
  const gotoArchived = () => {
    history.push("./archived");
  };
  const onSubmit = (data) => {
    if (data.password == userPassword) {
      handleClose();
      if (!pass) {
        var user = firebase.auth.currentUser;

        user
          .updateProfile({
            displayName: data.name,
          })
          .then(function () {
            console.log(firebase.auth.currentUser);
            setShowToast({ show: true, message: "Updated Successfully" });
          })
          .catch(function (error) {
            console.log("error");
          });
      } else if (data.password == userPassword && pass) {
        var user = firebase.auth.currentUser;
        var newPassword = data.passwordNew;
        setUserPassword(data.passwordNew);
        user
          .updateProfile({
            displayName: data.name,
          })
          .then(function () {
            // Update successful.
            console.log(firebase.auth.currentUser);
          })
          .catch(function (error) {
            // An error happened.
            console.log("error");
          });
        user
          .updatePassword(newPassword)
          .then(function () {
            setShowToast({ show: true, message: "Updated Successfully" });
          })
          .catch(function (error) {
            console.log("error");
          });
      }
    } else alert("Wrong Password");
  };
  const error = (type, message) => {
    return (
      <p>
        *
        {errors[type].type === "required"
          ? "Required"
          : errors[type].type === "minLength"
          ? `${message} is too short`
          : errors[type].type === "validate"
          ? `Invalid Email`
          : ""}
      </p>
    );
  };
  const editProfile = () => {};
  return (
    <div className=" nav">
      <div className="col-2">
        {" "}
        <img src="icon2.png"></img>
      </div>

      <div className="col-3">
        <Button className="taskk" onClick={gotoTasks} variant="">
          <h5>Tasks</h5>
        </Button>{" "}
      </div>

      <div className="col-3 ">
        {archived.length != 0 && (
          <Button onClick={gotoArchived} className="taskk" variant="">
            <h5>Archived</h5>
          </Button>
        )}
      </div>
      <div className="col-2"></div>
      <div className="col-1">
        <Dropdown>
          <Dropdown.Toggle
            variant="border-light"
            id="dropdown-basic"
            className="add"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              {
                <Button className="dropdown-button" onClick={handleShow}>
                  Edit Profile
                </Button>
              }
            </Dropdown.Item>
            <Dropdown.Item>
              <Button className="dropdown-button logout" onClick={logout}>
                Logout
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setPass(false);
        }}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>Name</label>
              <input
                type="text"
                defaultValue={firebase.auth.currentUser.displayName}
                ref={register({ required: true, minLength: 2 })}
                name="name"
                className={errors.name ? "has-error" : ""}
              ></input>
              {errors.name && error("name", "Name")}
              <label>Enter your Password</label>
              <input
                type="password"
                ref={register({ required: true, minLength: 2 })}
                defaultValue={firebase.auth.currentUser.password}
                name="password"
                className={errors.password ? "has-error" : ""}
                placeholder={pass ? "Old Password" : ""}
              ></input>
              {errors.password && error("password", "Password")}

              {!pass && (
                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <div className="col-1"></div>
                    <a
                      href="#changePassword"
                      onClick={() => {
                        setPass(true);
                      }}
                    >
                      Change Password
                    </a>
                  </div>
                </div>
              )}
              {pass && (
                <div className="d-flex flex-column ">
                  <input
                    type="password"
                    ref={register({ required: true, minLength: 2 })}
                    name="passwordNew"
                    className={errors.passwordNew ? "has-error" : ""}
                    placeholder="New Password"
                  ></input>
                  {errors.passwordNew && error("passwordNew", "Password")}
                </div>
              )}

              <div className="row">
                <div className="col"></div>
                <Button type="submit ">Save changes</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClose();
                    setPass(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Nav;

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";
const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  async function onRegister(data) {
    try {
      firebase.register(data.name, data.email, data.password);
      console.log("idddddd", firebase.getCurrentUserId());
      history.push("./login");
    } catch (error) {
      alert(error.message);
    }
  }
  firebase.auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) console.log(firebaseUser);
    else console.log("not logged in");
  });

  const onSubmit = (data, e) => {
    onRegister(data);
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
      <div className="row">
        <div className="col-6">
          <h1>Sign Up</h1>
          <div className="form">
            <form
              className="d-flex flex-column "
              onSubmit={handleSubmit(onSubmit)}
              //key={props.value.id}
            >
              <input
                ref={register({
                  required: true,
                  minLength: 2,
                  validate: (input) => validateEmail(input),
                })}
                className={errors.email ? "has-error" : ""}
                name="email"
                placeholder="Email"
              />
              {errors.email && error("email", "")}

              <input
                ref={register({ required: true, minLength: 2 })}
                className={errors.name ? "has-error" : ""}
                name="name"
                placeholder="Name"
              />
              {errors.name && error("name", "")}

              <input
                type="password"
                ref={register({ required: true, minLength: 5 })}
                className={errors.password ? "has-error" : ""}
                name="password"
                placeholder="Password"
              />
              {errors.password && error("password", "")}

              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </form>
            <a href="/login">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

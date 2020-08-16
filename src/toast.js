import React, { useContext } from "react";
import { Toast } from "react-bootstrap";
import { TaskContext } from "./taskContext";
const Toastt = (props) => {
  const { value, value2, value3, value4, value5, value6 } = useContext(
    TaskContext
  );
  const [showToast, setShowToast] = value6;

  return (
    <Toast
      onClose={() => setShowToast({ show: false })}
      show={showToast.show}
      delay={3000}
      autohide
    >
      <Toast.Header></Toast.Header>
      <Toast.Body>
        <h5>{showToast.message}</h5>
      </Toast.Body>
    </Toast>
  );
};
export default Toastt;

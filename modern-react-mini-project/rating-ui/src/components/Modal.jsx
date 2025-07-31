import React from "react";
import Button from "./Button";

function Modal({ isOpen, onClose, rating }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thank you!</h2>
        <p>
          You rated us {rating} star{rating > 1 ? "s" : ""}
        </p>
        <Button className="close-btn" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default Modal;

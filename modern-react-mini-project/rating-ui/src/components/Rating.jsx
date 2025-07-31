import React, { useState } from "react";
import Star from "./Star";
import Modal from "./Modal";
import Button from "./Button";

const Rating = ({ heading = "Rate Your Experience" }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const feedback = ["Terrible", "Poor", "Fair", "Good", "Excellent"];
  const color = "#ffc107"; // golden yellow

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
    }
    console.log(`User rated: ${rating}/5`);
  };

  const closeModal = () => {
    setSubmitted(false);
    setRating(0);
    setHover(0);
  };

  return (
    <div className="rating-container">
      <h2>{heading}</h2>

      <div className="stars">
        {stars.map((star) => (
          <Star
            key={star}
            star={star}
            rating={rating}
            hover={hover}
            color={color}
            ratingClick={setRating}
            hoverEnter={setHover}
            hoverLeave={() => setHover(0)}
          />
        ))}
      </div>

      {rating > 0 && <p className="feedback">{feedback[rating - 1]}</p>}

      {/* <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={rating === 0 || submitted}
      >
        {submitted ? "Submitted!" : "Submit"}
      </button> */}
      <Button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={rating === 0 || submitted}
      >
        {submitted ? "Submitted!" : "Submit"}
      </Button>

      {/* 🔥 Here's the actual working modal! */}
      <Modal isOpen={submitted} onClose={closeModal} rating={rating} />
    </div>
  );
};

export default Rating;

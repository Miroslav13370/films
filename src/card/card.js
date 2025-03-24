import React from "react";
import PropTypes from "prop-types";

function Card({ overview }) {
  return (
    <div>
      <h1>Номер</h1>
      <span>{overview}</span>
    </div>
  );
}

Card.propTypes = {
  overview: PropTypes.string,
};

export default Card;

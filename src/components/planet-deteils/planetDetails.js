import React from "react";
import PropTypes from "prop-types";

function PlanetDetails({ planet }) {
  const { name, population, diameter, climate } = planet;
  return (
    <div>
      <h1>Имя: {name}</h1>
      <h1>Популяция: {population}</h1>
      <h1>Диаметр: {diameter}</h1>
      <h1>климат: {climate}</h1>
    </div>
  );
}

PlanetDetails.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
  }),
};
export default PlanetDetails;

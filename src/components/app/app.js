import React, { useState, useEffect } from "react";
import swapiServise from "../../services/swappi-services";
import PlanetDetails from "../planet-deteils/planetDetails";

function App() {
  const arr = {
    name: null,
    diameter: null,
    population: null,
    climate: null,
  };
  const [planet, setplanet] = useState(arr);

  useEffect(() => {
    swapiServise.getAllPlanet().then((all) => {
      setplanet(() => {
        return all[1];
      });
    });
  }, []);

  return (
    <div>
      <PlanetDetails planet={planet} />
    </div>
  );
}

export default App;

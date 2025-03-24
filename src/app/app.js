import React, { useState, useEffect } from "react";
import sendApi from "../sendApi/sendApi";
import CardList from "../cardList/cardList";

function App() {
  const [filmList, setFilmList] = useState("load");

  useEffect(() => {
    sendApi.getApi().then((api) => {
      setFilmList(() => {
        return api.results.slice(0, 6);
      });
    });
  }, []);

  return (
    <div>
      <CardList filmList={filmList} />
    </div>
  );
}

export default App;

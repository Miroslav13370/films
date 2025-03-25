import React, { useState, useEffect } from "react";
import sendApi from "../sendApi/sendApi";
import CardList from "../cardList/cardList";
import "./app.css";

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
    <div className="wrap">
      <div className="body">
        <CardList filmList={filmList} />
      </div>
    </div>
  );
}

export default App;

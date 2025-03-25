import React, { useState, useEffect } from "react";
import sendApi from "../sendApi/sendApi";
import CardList from "../cardList/cardList";
import "./app.css";
import Loading from "../loading/loading";
import Err from "../error/error";

function App() {
  const [filmList, setFilmList] = useState(Loading);

  useEffect(() => {
    sendApi
      .getApi()
      .then((api) => {
        if (!api.results) {
          throw new Error("Что-то пошло не так");
        }
        setFilmList(() => {
          return api.results.slice(0, 6);
        });
      })
      .catch(() => {
        setFilmList(Err);
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

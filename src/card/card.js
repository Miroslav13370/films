import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./card.css";
import { parseISO, format } from "date-fns";
import fallbackImg from "../image/noloadIMG.png";
import Loading from "../loading/loading";

function Card({ overview, posterPath, title, releaseDate }) {
  const [disc, setDesc] = useState("Нет данных");
  const [date, setdate] = useState("загрузка...");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const arr = overview.split(" ");
    if (arr.length > 25) {
      let srt = "";
      arr.splice(0, 25).forEach((element, i) => {
        srt += `${element} `;
        if (i === 24) {
          srt += "...";
        }
      });
      setDesc(srt);
    }
    if (releaseDate) {
      setdate(format(parseISO(releaseDate), "MMMM d, yyyy"));
    } else {
      setdate("В апи нет даты");
    }
  }, [overview, releaseDate]);
  return (
    <div className="card">
      {load && <Loading />}
      <img
        onLoad={() => {
          setLoad(false);
        }}
        src={`http://image.tmdb.org/t/p/w185/${posterPath}`}
        alt="Постер"
        className="imgage"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
      />

      <div className="text">
        <p className="title"> {title}</p>
        <p className="release"> {date}</p>
        <div className="genre">
          <p className="genreTitle">Жанр</p>
          <p className="genreTitle">Жанр 2</p>
        </div>
        <p className="description">{disc}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
};

export default Card;

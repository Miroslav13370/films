import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./card.css";
import { parseISO, format } from "date-fns";

function Card({ overview, posterPath, title, releaseDate }) {
  const [disc, setDesc] = useState("Нет данных");

  useEffect(() => {
    const arr = overview.split(" ");
    if (arr.length > 30) {
      let srt = "";
      arr.splice(0, 30).forEach((element, i) => {
        srt += `${element} `;
        if (i === 29) {
          srt += "...";
        }
      });
      setDesc(srt);
    }
  }, [overview]);
  return (
    <div className="card">
      <img src={`http://image.tmdb.org/t/p/w185/${posterPath}`} alt="Постер" className="imgage" />
      <div className="text">
        <p className="title"> {title}</p>
        <p className="release"> {format(parseISO(releaseDate), "MMMM d, yyyy")}</p>
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

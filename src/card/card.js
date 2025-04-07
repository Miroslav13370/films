import React, { useState, useEffect, useContext } from "react";
import { Rate } from "antd";
import PropTypes, { number } from "prop-types";
import "./card.css";
import { parseISO, format } from "date-fns";
import CardContext from "../CardContext/CardContext";
import fallbackImg from "../image/noloadIMG.png";
import Loading from "../loading/loading";
import sendApi from "../sendApi/sendApi";

function Card({ overview, posterPath, title, releaseDate, id }) {
  const [disc, setDesc] = useState("Нет данных");
  const [date, setdate] = useState("загрузка...");
  const [load, setLoad] = useState(true);
  const { stars, setStars } = useContext(CardContext);
  const handleClickChangeRate = (value) => {
    if (
      Date.now() - Number(localStorage.getItem("timeSession")) > 86400000 ||
      !localStorage.getItem("timeSession")
    ) {
      sendApi.getSession().then((result) => {
        localStorage.clear();
        localStorage.setItem("session", result);
        localStorage.setItem("timeSession", Date.now());
        sendApi.addRating(value, result, id);
      });
    } else {
      sendApi.addRating(value, localStorage.getItem("session"), id).then(() => {
        sendApi.getRaited(localStorage.getItem("session")).then(({ results }) => {
          if (results) {
            results.forEach((elem) => {
              setStars((arr) => {
                localStorage.setItem(id, value);
                return { ...arr, [elem.id]: { rate: value } };
              });
            });
          }
        });
      });
    }
  };

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
        <Rate
          allowHalf
          defaultValue={Number(localStorage.getItem(id))}
          onChange={handleClickChangeRate}
          value={Number(localStorage.getItem(id))}
          count={10}
          style={{ fontSize: 15 }}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
};

export default Card;

import React, { useState, useEffect, useContext } from "react";
import { Rate } from "antd";
import PropTypes from "prop-types";
import "./card.css";
import { parseISO, format } from "date-fns";
import CardContext from "../CardContext/CardContext";
import fallbackImg from "../image/noloadIMG.png";
import Loading from "../loading/loading";
import sendApi from "../sendApi/sendApi";

function Card({ overview, posterPath, title, releaseDate, id, genreIds, vote }) {
  const [disc, setDesc] = useState("Нет данных описания");
  const [date, setdate] = useState("загрузка...");
  const [load, setLoad] = useState(true);
  const [topRaitColor, setTopRaitColor] = useState("#E90000");
  const { stars, setStars } = useContext(CardContext);
  const handleClickChangeRate = (value) => {
    if (
      Date.now() - Number(localStorage.getItem("timeSession")) > 86400000 ||
      !localStorage.getItem("timeSession")
    ) {
      sendApi.getSession().then((result) => {
        sendApi.addRating(value, result, id);
      });
    } else {
      sendApi.addRating(value, localStorage.getItem("session"), id).then(() => {
        sendApi.getRaited(localStorage.getItem("session")).then(({ results }) => {
          if (results) {
            results.forEach((elem) => {
              setStars((arr) => {
                localStorage.setItem(id, value);
                localStorage.setItem("useApi", "yes");
                return { ...arr, [elem.id]: { rate: value } };
              });
            });
          }
        });
      });
    }
  };

  useEffect(() => {
    if (vote <= 3 && vote < 0) {
      setTopRaitColor("#E90000");
    }
    if (vote > 3 && vote <= 5) {
      setTopRaitColor("#E97E00");
    }
    if (vote > 5 && vote < 7) {
      setTopRaitColor("#E9D100");
    }
    if (vote > 7) {
      setTopRaitColor("#66E900");
    }

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
      setdate("Нет данных о дате");
    }
  }, [overview, releaseDate, vote]);
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
        <div className="topLine">
          <p className="title"> {title}</p>
          <p className="totalRait" style={{ border: `2px solid ${topRaitColor}` }}>
            {vote.toFixed(1)}
          </p>
        </div>
        <p className="release"> {date}</p>
        <div className="genre">
          {genreIds.length > 0 ? (
            genreIds.map((idGenre) => {
              let genreName = "";
              stars.genre.forEach((elem) => {
                if (elem.id === idGenre) {
                  genreName = elem.name;
                }
              });
              return (
                <p className="genreTitle" key={Math.random()}>
                  {genreName}
                </p>
              );
            })
          ) : (
            <p className="genreTitle">Нет данных о жанре</p>
          )}
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
  genreIds: PropTypes.arrayOf(PropTypes.node),
  vote: PropTypes.string,
};

export default Card;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../card/card";
import Loading from "../loading/loading";

function CardList({ filmList }) {
  const [listCard, setlistCard] = useState(Loading);

  useEffect(() => {
    if (filmList[0]) {
      const list = filmList.map((elem) => {
        const {
          overview,
          poster_path: posterPath,
          title,
          release_date: releaseDate,
          popularity,
        } = elem;
        return (
          <Card
            overview={overview}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            key={popularity}
          />
        );
      });
      setlistCard(list);
    } else {
      setlistCard(filmList);
    }
  }, [filmList]);

  return listCard;
}

CardList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filmList: PropTypes.objectOf(PropTypes.any),
};

export default CardList;

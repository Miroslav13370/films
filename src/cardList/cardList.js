import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../card/card";

function CardList({ filmList }) {
  const load = () => {
    return <>Загрузка</>;
  };

  const [listCard, setlistCard] = useState(load);

  useEffect(() => {
    if (filmList !== "load") {
      const list = filmList.map((elem) => {
        const { overview } = elem;
        return <Card overview={overview} />;
      });
      setlistCard(list);
    }
  }, [filmList]);

  return listCard;
}

CardList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filmList: PropTypes.objectOf(PropTypes.any),
};

export default CardList;

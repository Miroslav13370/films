import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import Loading from '../loading/loading';
import Noretult from '../error/noResult';
import NoAdd from '../error/noAdd';

function CardList({ filmList, addList }) {
  const [listCard, setlistCard] = useState(Loading);

  useEffect(() => {
    if (filmList?.[0] && filmList !== 'load') {
      const list = filmList.map((elem) => {
        const {
          overview,
          poster_path: posterPath,
          title,
          release_date: releaseDate,
          id,
          genre_ids: genreIds,
          vote_average: vote,
        } = elem;
        return (
          <Card
            overview={overview}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            key={id}
            id={id}
            genreIds={genreIds}
            vote={vote}
          />
        );
      });
      setlistCard(list);
    } else if (filmList === 'load') {
      setlistCard(Loading);
    } else if (!filmList?.[0] && addList) {
      setlistCard(NoAdd);
    } else {
      setlistCard(Noretult);
    }
  }, [filmList, addList]);

  return listCard;
}

CardList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  filmList: PropTypes.objectOf(PropTypes.any),
  addList: PropTypes.bool,
};

export default CardList;

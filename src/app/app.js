/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Online, Offline } from 'react-detect-offline';
import { Input, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';
import CardContext from '../CardContext/CardContext';
import sendApi from '../sendApi/sendApi';
import CardList from '../cardList/cardList';
import './app.css';
import Loading from '../loading/loading';
import Err from '../error/error';
import NoInternet from '../error/noInternet';

function App() {
  const [filmList, setFilmList] = useState('load');
  const { Search } = Input;
  const [value, setvalue] = useState('');
  const [sech, setSech] = useState('text');
  const [pagees, setpagees] = useState('1');
  const [stars, setStars] = useState({});
  const [riteFilm, addRiteFilm] = useState(Loading);
  const [addList, setAddlist] = useState(false);
  const { TabPane } = Tabs;
  const firstRender = useRef(true);
  const chandeValue = (e) => {
    setvalue(e.target.value);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log('2 раза привет');
    if (
      Date.now() - Number(localStorage.getItem('timeSession')) > 86400000 ||
      !localStorage.getItem('timeSession')
    ) {
      sendApi.getSession().then((result) => {
        localStorage.clear();
        localStorage.setItem('session', result);
        localStorage.setItem('timeSession', Date.now());
      });
    }
    sendApi
      .getApi(sech, pagees)
      .then((api) => {
        if (!api.results) {
          throw new Error('Что-то пошло не так');
        }
        setFilmList(() => {
          return api.results;
        });
      })
      .catch(() => {
        setFilmList(Err);
      });
  }, [sech, pagees]);

  useEffect(() => {
    const debounceHend = debounce(() => {
      setSech(value);
    }, 1000);

    debounceHend();

    return () => {
      debounceHend.cancel();
    };
  }, [value]);

  useEffect(() => {
    sendApi.getGenre().then((res) => {
      setStars((arr) => {
        return { ...arr, genre: res };
      });
    });
  }, []);

  const changePage = (page) => {
    setpagees(page);
  };

  const handleTadChange = (key) => {
    if (localStorage.getItem('useApi')) {
      sendApi.getRaited(localStorage.getItem('session')).then((arr) => {
        addRiteFilm(arr.results);
      });
    }
    if (key === '2') {
      setAddlist(true);
    }

    if (key === '1') {
      setAddlist(false);
    }
  };

  return (
    <CardContext.Provider value={useMemo(() => ({ stars, setStars }), [stars, setStars])}>
      <Offline>
        <NoInternet />
      </Offline>
      <Online>
        <Tabs defaultActiveKey="1" centered onChange={handleTadChange}>
          <TabPane tab="Search" key="1">
            <div className="wrap">
              <Search
                placeholder="input search loading default"
                className="inp"
                value={value}
                onChange={chandeValue}
              />
              <div className="body">
                <CardList filmList={filmList} />
              </div>
              <Pagination
                defaultCurrent={1}
                total={500}
                onChange={changePage}
                className="pagination"
              />
            </div>
          </TabPane>
          <TabPane tab="Rated" key="2">
            <div className="wrap">
              <div className="body">
                <CardList filmList={riteFilm} addList={addList} />
              </div>
              <Pagination
                defaultCurrent={1}
                total={500}
                onChange={changePage}
                className="pagination"
              />
            </div>
          </TabPane>
        </Tabs>
      </Online>
    </CardContext.Provider>
  );
}

export default App;

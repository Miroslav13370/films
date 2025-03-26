import React, { useState, useEffect } from "react";
import { Online, Offline } from "react-detect-offline";
import { Input, Pagination } from "antd";
import { debounce } from "lodash";
import sendApi from "../sendApi/sendApi";
import CardList from "../cardList/cardList";
import "./app.css";
import Loading from "../loading/loading";
import Err from "../error/error";
import NoInternet from "../error/noInternet";

function App() {
  const [filmList, setFilmList] = useState(Loading);
  const { Search } = Input;
  const [value, setvalue] = useState("");
  const [sech, setSech] = useState("Film");
  const [pagees, setpagees] = useState("1");
  const chandeValue = (e) => {
    setvalue(e.target.value);
  };

  useEffect(() => {
    sendApi
      .getApi(sech, pagees)
      .then((api) => {
        if (!api.results) {
          throw new Error("Что-то пошло не так");
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

  const changePage = (page) => {
    setpagees(page);
  };

  return (
    <>
      <Offline>
        <NoInternet />
      </Offline>
      <Online>
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
          <Pagination defaultCurrent={1} total={500} onChange={changePage} />
        </div>
      </Online>
    </>
  );
}

export default App;

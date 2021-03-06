import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetShow.css";
import ShowList from "./components/ShowList";
import Form from "./components/Form";

function GetShow(props) {
  const [shows, setShows] = useState([]);

  const [showTypeChecked, setShowTypeChecked] = useState("");

  const [time, setTime] = useState(300);

  //Type
  const onChooseShowType = (value) => {
    setShowTypeChecked(value);
    console.log(showTypeChecked);
  };
  console.log(showTypeChecked);
  const onChooseTime = (event) => {
    setTime(event.target.value);
  };

  const showTypes = [
    { label: "Movies", value: "movie" },
    { label: "TV series", value: "tv" },
  ];

  const API_KEY = import.meta.env.VITE_API_KEY;

  const getShowRequest = (showTypeChecked, time) => {
    const url = `https://api.themoviedb.org/3/discover/${showTypeChecked}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_runtime.lte=${time}&with_status=0&with_type=0`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const n = data.results;

        if (n) {
          setShows(n);
        }
      });
  };

  useEffect(() => {
    getShowRequest(showTypeChecked, time);
  }, [showTypeChecked, time]);

  return (
    <div className="container-fluid">
      <Form
        showTypes={showTypes}
        onChooseShowType={onChooseShowType}
        showTypes={showTypes}
        showTypeChecked={showTypeChecked}
        onChooseTime={onChooseTime}
      />

      <ShowList
        shows={shows}
        handleAddFavourites={props.handleAddFavourites}
        showTypeChecked={showTypeChecked}
      />
    </div>
  );
}

export default GetShow;

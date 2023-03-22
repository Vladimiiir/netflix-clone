import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../axios";
import requests from "../Request";

function Banner() {
  const [movie, setMovie] = useState([]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  // fetching the movie
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;
  return (
    // background header image
    <header
      className="banner"
      style={{
        backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* movie name */}
        <h1 className="banner__title">
          {movie?.name || movie?.original_name || movie?.title}
        </h1>
        {/* the two bottons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;

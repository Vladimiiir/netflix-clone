import axios from "axios";

// permits us to connect client to TMDB server using this
// query strings are added in Request.js file (API, etc.)

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

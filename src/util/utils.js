import { omdbapiKey } from "../config";

export const getImdbId = async (title) => {
  const response = await fetch(
    `http://www.omdbapi.com/?t=${title}&apikey=${omdbapiKey}`
  );
  const data = await response.json();
  const imdbID = await data.imdbID;
  return imdbID;
};

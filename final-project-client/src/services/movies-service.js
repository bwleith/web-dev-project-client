import axios from 'axios';
const OMDB_API = "http://www.omdbapi.com/?apikey=de4824f3";

export const findMovie = async () => {
    console.log('SEARCH OMDB...');
    // placeholder for testing
    const response = await axios.get("http://www.omdbapi.com/?apikey=de4824f3&t=Dune");
    return response.data;
}
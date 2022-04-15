import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import NavigationSidebar from "../NavigationSidebar";

const Details = () => {
    const [movieDetails, setMovieDetails] = useState({})
    const [ourMovieDetails, setOurMovieDetails] = useState({})
    const url = "http://www.omdbapi.com/?apikey=de4824f3"
    const {imdbID} = useParams()
    const searchMovieByImdbID = async () => {
        const response = await axios.get(`${url}&i=${imdbID}`)
        setMovieDetails(response.data)
        console.log('response');
        console.log(response.data);
    }
    const searchOurMovieByImdbID = async () => {
        const response = await axios.get(`http://localhost:4000/api/movies/${imdbID}`)
        setOurMovieDetails(response.data)
    }
    useEffect(() => {
        searchMovieByImdbID()
        searchOurMovieByImdbID()
    }, [])

    return (
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                <h1>{movieDetails.Title}</h1>
                {movieDetails.Year} - {movieDetails.Runtime} - {movieDetails.Rated}
                <div className = "row">
                    <div className = "col-4">
                        <img src={movieDetails.Poster} height={400}/>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-8">
                        {movieDetails.Plot}
                    </div>
                </div>

                <hr/>

                <div className="row">
                    <span><b>Director</b> {movieDetails.Director}</span>
                </div>

                <hr/>

                <div className="row">
                    <span><b>Written by</b> {movieDetails.Writer}</span>
                </div>

                <hr/>

                <div className="row">
                    <span><b>Stars</b> {movieDetails.Actors}</span>
                </div>

            </div>
        </div>
    );
};

export default Details;
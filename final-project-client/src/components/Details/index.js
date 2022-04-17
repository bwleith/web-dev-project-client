import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import NavigationSidebar from "../NavigationSidebar";

const Details = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const [ourMovieDetails, setOurMovieDetails] = useState([{}]);
    const [newReview, setNewReview] = useState({});
    const url = "http://www.omdbapi.com/?apikey=de4824f3"
    const {imdbID} = useParams()
    const searchMovieByImdbID = async () => {
        const response = await axios.get(`${url}&i=${imdbID}`)
        setMovieDetails(response.data)
    }
    const searchOurMovieByImdbID = async () => {
        const response = await axios.get(`http://localhost:4000/api/reviews?imdbId=${imdbID}`)
        setOurMovieDetails(response.data)
    }

    const createReview = async(review) => {
        console.log('POST http://localhost:4000/api/reviews')
        console.log('body: ', review);
        const response = await axios.post('http://localhost:4000/api/reviews', review);
        console.log('post response: ', response);
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

                <hr/>

                <div className="row">

                    <h4>Add a Review</h4>

                    <hr/>

                    <textarea className="form-control"
                        onChange={(e) =>
                            setNewReview({...newReview,
                                "username": "test_user",
                                "imdbId": `${imdbID}`,
                                "title": movieDetails.Title,
                                "poster": movieDetails.Poster,
                                "review": e.target.value
                            })}
                    >
                    </textarea>

                    <hr/>



                    <button
                        className = "btn btn-primary btn-block rounded-pill"
                        onClick={() => createReview(newReview)}
                    >
                        Submit
                    </button>

                </div>


                <hr/>

                <h4>Recent Reviews</h4>

                <hr/>

                <div>
                    {ourMovieDetails.map(
                        movie =>
                            <div className="row mt-2" key={movie._id || 1}>

                                <div className="col-12">


                                    <div>
                                        <b>{movie.username}</b>
                                    </div>

                                    {movie.review}


                                    <hr/>
                                </div>
                            </div>
                    )}
                </div>



            </div>

        </div>
    );
};

export default Details;
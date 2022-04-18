import NavigationSidebar from '../NavigationSidebar';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const HomeScreen = () => {
    const [ourMovieDetails, setOurMovieDetails] = useState([{}]);

    const searchOurMovie = async () => {
        const response = await axios.get(`http://localhost:4000/api/reviews`)
        console.log(response);
        setOurMovieDetails(response.data)
    }

    useEffect(() => {
        searchOurMovie()
    }, [])

    return (
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-md-8 col-lg-5 col-xl-6">
                <div className="row">
                    <h1>Recent Reviews</h1>
                </div>

                <div className = "row">
                    {ourMovieDetails.map(
                        movie =>
                            <div className="row mt-2" key={movie._id || 1}>

                                <div className="col-2">
                                    <Link to={"/details/" + movie.imdbId}>
                                        <img src={movie.poster} alt="" height="100"/>
                                    </Link>
                                </div>

                                <div className="col-10">


                                    <div>
                                        <div>
                                            <Link to={"/details/" + movie.imdbId}>
                                                <b>{movie.title}</b>
                                            </Link>
                                        </div>


                                        <div>
                                            <Link to={"/profile/" + movie.username}>
                                                @{movie.username}
                                            </Link>
                                        </div>

                                    </div>

                                    {movie.review}


                                    <hr/>
                                </div>
                            </div>
                    )}
                </div>

            </div>
            <div className="d-xs-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                Additional content
            </div>
        </div>
    );
};
export default HomeScreen;
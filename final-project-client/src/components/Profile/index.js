import NavigationSidebar from "../NavigationSidebar";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const Profile = () => {
    const API_URL = 'http://localhost:4000/api';
    const [recentReviews, setRecentReviews] = useState([{}]);
    const [favorites, setFavorites] = useState([{}]);
    const params = useParams();
    const username = params.username;

    const searchRecentReviewsByUsername = async () => {
        console.log("GET " + `${API_URL}/reviews?username=${username}` + '');
        const response = await axios.get(`${API_URL}/reviews?username=${username}`);

        setRecentReviews(response.data);
        console.log(response.data);
    }

    const searchRecentFavoritesByUsername = async () => {
        console.log("GET " + `${API_URL}/favorites/${username}` + '');
        const response = await axios.get(`${API_URL}/favorites/${username}`);

        setFavorites(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        searchRecentReviewsByUsername()
        searchRecentFavoritesByUsername()
    }, [])

    return(
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                Profile main content

                <h3>Favorites</h3>

                <div className="row mt-2">
                    {
                        favorites.map(
                            movie =>
                                <div className="col-1">
                                    <Link to={"../details/" + movie.imdbId}>
                                        <img src={movie.poster} alt="" height="100"/>
                                    </Link>
                                </div>
                        )
                    }
                </div>

                <h3>Recent Activity</h3>

                <div>
                    {recentReviews.map(
                        movie =>
                            <div className="row mt-2" key={movie._id || 1}>

                                <div className="col-1">
                                    <Link to={"../details/" + movie.imdbId}>
                                        <img src={movie.poster} alt="" height="100"/>
                                    </Link>
                                </div>

                                <div className="col-10">
                                    <div className="row">
                                        <b>{movie.username}</b>
                                    </div>

                                    {movie.review}

                                </div>
                            </div>


                        )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
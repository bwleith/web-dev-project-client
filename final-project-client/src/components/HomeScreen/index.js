import NavigationSidebar from '../NavigationSidebar';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useProfile} from "../../contexts/profile-context";

const HomeScreen = () => {
    const API_URL = 'http://localhost:4000/api'

    const [ourMovieDetails, setOurMovieDetails] = useState([{}]);

    const [newUsers, setNewUsers] = useState([{}]);

    const {profile} = useProfile();

    const searchUsers = async () => {
        const response = await axios.get(`${API_URL}/users/limit/5`);
        console.log('users: ', response.data);
        setNewUsers(response.data);
    }

    const searchOurMovie = async () => {
        if (profile) {
            console.log('GET ' + `${API_URL}/${profile.username}/reviews`);
            const response = await axios.get(`${API_URL}/follows/${profile.username}/reviews`);
            setOurMovieDetails(response.data);
            console.log('searchOurMovie response.data: ', ourMovieDetails);
        } else {
            const response = await axios.get(`${API_URL}/reviews`)
            setOurMovieDetails(response.data)
            console.log('searchOurMovie response.data ', ourMovieDetails);

        }

    }

    useEffect(() => {
        searchOurMovie()
        searchUsers()
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

                <h4>New Users</h4>

                {newUsers.map(
                    user =>
                    <div className="row mt-2">
                        <Link to={'/profile/' + user.username}>
                            <div>
                                <b>{user.firstName !== "" && user.firstName + ' ' + user.lastName}</b>
                                <b>{user.firstName === "" && 'New User'}</b>
                            </div>

                            <div>
                                @{user.username}
                            </div>
                        </Link>


                    </div>

                )}

            </div>
        </div>
    );
};
export default HomeScreen;
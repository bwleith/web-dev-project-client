import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import NavigationSidebar from "../NavigationSidebar";
import {useProfile} from "../../contexts/profile-context";

const Details = () => {
    const API_URL = 'http://localhost:4000/api';
    const [movieDetails, setMovieDetails] = useState({});
    const [ourMovieDetails, setOurMovieDetails] = useState([{}]);
    const [newReview, setNewReview] = useState({});
    const [isFavorite, setIsFavorite] = useState({});
    const url = "http://www.omdbapi.com/?apikey=de4824f3"
    const {imdbID} = useParams()
    const {profile} = useProfile();

    const handleLike = async (movie) => {
        console.log('inside handleLike');
        if (profile) {
            setOurMovieDetails(
                ourMovieDetails.map(
                    details => details._id !== movie._id ? details :
                        {
                            ...movie,
                            likes: [...movie.likes, {username: profile.username, reviewId: details._id}],
                            liked: true
                        }
                )
            );
            const response = await axios.post(`${API_URL}/likes`, {username: profile.username, _reviewId: movie._id});
            console.log('handleLike response: ');
            console.log(response);
        }
    }

    const handleUnLike = async (movie) => {
        console.log('inside handleUnlike')
        if (profile) {
            setOurMovieDetails(
                ourMovieDetails.map(
                    details => details._id !== movie._id ? details :
                        {
                            ...movie,
                            likes: movie.likes.filter(like => like.username !== profile.username),
                            liked: undefined
                        }
                )
            );
        }
        const response = await axios.delete(`${API_URL}/likes`, {data: {username: profile.username, _reviewId: movie._id}});
        console.log('handleLike response: ');
        console.log(response);
        console.log('movie.likes: ', movie.likes);

    }

    const searchFavorite = async () => {
        if (profile) {
            console.log('inside searchFavorite');
            const response = await axios.get(`${API_URL}/favorites/${profile.username}/movies/${imdbID}`);
            console.log('response: ', response);
            if (response.data) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false);
            }
            console.log('isFavorite: ', isFavorite);
        }
    }

    console.log(searchFavorite());

    const searchMovieByImdbID = async () => {
        const response = await axios.get(`${url}&i=${imdbID}`)
        setMovieDetails(response.data)
    }
    const searchOurMovieByImdbID = async () => {
        const response = await axios.get(`${API_URL}/reviews?imdbId=${imdbID}`)
        setOurMovieDetails(response.data)
    }

    const createReview = async(review) => {
        console.log('POST ' + API_URL + '/reviews')
        console.log('body: ', review);
        const response = await axios.post(`${API_URL}/reviews`, review);
        console.log('post response: ', response);
        setOurMovieDetails(
            [
                review,
                ...ourMovieDetails,
            ]
        )
    }

    const deleteReview = async(review) => {
        console.log('DELETE ' + API_URL + '/reviews', review);
        const response = await axios.delete(`${API_URL}/reviews/`, {data: review});
        console.log('delete response: ', response);
        setOurMovieDetails(
            ourMovieDetails.filter(details => details !== review)
        );
    }

    const createFavorite = async(movieDetails) => {
        console.log('POST ' + API_URL + '/favorites');
        const body = {
            "username": `${profile.username}`,
            "imdbId": `${imdbID}`,
            "title": movieDetails.Title,
            "poster": movieDetails.Poster
        };
        console.log('body ', body);
        const response = await axios.post(`${API_URL}/favorites/`, body);
        console.log('post response: ', response);
        setIsFavorite(true);
    }

    const deleteFavorite = async() => {
        console.log('DELETE ' + API_URL + '/favorites');
        console.log(`${imdbID}`)
        const data = {
            "username": `${profile.username}`,
            "imdbId": `${imdbID}`
        };
        const response = await axios.delete(`${API_URL}/favorites/`, {data: data});
        console.log('delete response: ', response);
        setIsFavorite(false);
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

                {profile && !isFavorite && <div className="row">
                    <div className="col-3">
                        <button
                            className = "btn btn-primary btn-block rounded-pill"
                            onClick={() => createFavorite(movieDetails)}
                        >
                            Add to Favorites
                        </button>
                    </div>
                </div>}


                {profile && isFavorite && <div className="row">
                    <div className="col-3">
                        <button
                            className = "btn btn-primary btn-block rounded-pill"
                            onClick={() => deleteFavorite(movieDetails)}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                </div>}

                {profile && <hr/>}
                {profile && (profile.role === 'Fan' || profile.role === 'Admin') && <div className="row">

                    <h4>Add a Review</h4>

                    <hr/>

                    <textarea className="form-control"
                        onChange={(e) =>
                            setNewReview({...newReview,
                                "username": `${profile.username}`,
                                "imdbId": `${imdbID}`,
                                "title": movieDetails.Title,
                                "poster": movieDetails.Poster,
                                "review": e.target.value,
                                "likes": []
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

                </div>}


                <hr/>

                <h4>Recent Reviews</h4>

                <hr/>

                <div>
                    {ourMovieDetails.map(



                        (movie) =>

                            <div className="row mt-2" key={movie._id || 1}>

                                <div className="col-12">

                                    <div className="row">
                                        <div className="col-10">
                                            <Link to={"../profile/" + movie.username}>
                                                <b>@{movie.username}</b>
                                            </Link>
                                        </div>
                                        <div className="col-1">
                                            {profile && (profile.username === movie.username || profile.role === "Admin") &&
                                                <i className="fa fa-delete-left float-right"
                                               onClick={() => deleteReview(movie)}
                                            />}
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-10">
                                            {movie.review}
                                        </div>
                                        <div className="col-2">
                                            {profile && movie.likes !== undefined && movie.likes.filter(like => like.username === profile.username).length === 0 &&
                                                <i className="fa fa-thumbs-up"
                                                   onClick={(e) =>
                                                       handleLike(movie)
                                                   }
                                                />}
                                            {profile && movie.likes !== undefined && movie.likes.filter(like => like.username === profile.username).length > 0 &&
                                                <i className="fa fa-thumbs-up"
                                                   onClick={(e) =>
                                                       handleUnLike(movie)
                                                   }
                                                />}
                                            {!profile && <i className="fa fa-thumbs-up"/>}
                                            {movie.likes && movie.likes.length} Likes

                                        </div>
                                    </div>



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
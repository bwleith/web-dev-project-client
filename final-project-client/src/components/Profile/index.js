import NavigationSidebar from "../NavigationSidebar";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useProfile} from "../../contexts/profile-context";

const Profile = () => {
    const API_URL = 'http://localhost:4000/api';
    const [edit, setEdit] = useState(false);
    const [details, setDetails] = useState({});
    const [recentReviews, setRecentReviews] = useState([{}]);
    const [favorites, setFavorites] = useState([{}]);
    const [followedByCurrentUser, setFollowedByCurrentUser] = useState(false);
    const params = useParams();
    const username = params.username;

    const {profile} = useProfile();

    console.log('profile ', profile);

    const getProfileDetails = async() => {
        console.log('inside getProfileDetails');
        const response = await axios.get(`${API_URL}/users/username/${username}`)
        console.log('getProfileDetails response: ', response.data);
        setDetails(response.data);
    }

    const updateProfileDetails = async(details) => {
        const status = axios.put(`${API_URL}/users/${profile._id}`, details);
        console.log('updateProfileDetails status: ', status);
        setDetails(details);
        setEdit(false);
    }

    const createFollow = async(follow) => {
        console.log('POST ' + API_URL + '/follows')
        console.log('body: ', follow);
        const response = await axios.post(`${API_URL}/follows`, follow);
        console.log('post response: ', response);
        setFollowedByCurrentUser(true);
    }

    const deleteFollow = async(follow) => {
        console.log('DELETE ' + API_URL + '/follows')
        console.log('body: ', follow);
        const response = await axios.delete(`${API_URL}/follows`, follow);
        console.log('post response: ', response);
        setFollowedByCurrentUser(false);
    }

    const checkFollowedByCurrentUser = async() => {
        if (profile) {
            console.log('inside checkFollowedByCurrentUser');
            console.log("GET + " + `${API_URL}/username/${profile.username}/follows/${username}`);
            const response = await axios.get(`${API_URL}/username/${profile.username}/follows/${username}`);
            setFollowedByCurrentUser(response.data !== null);
            console.log('checkFollowedByCurrentUser response: ', response.data);
        }
    }

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
        checkFollowedByCurrentUser()
        getProfileDetails()
    }, [])

    return(
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                <div>
                    <h4>{username}</h4>
                    {profile && profile.username !== username && !followedByCurrentUser && <div>
                        <i className="fa fa-plus"
                           onClick={() => createFollow({username: profile.username, follows: username})}
                        /> Follow
                    </div>}

                    {profile && profile.username !== username && followedByCurrentUser && <div>
                        <i className="fa fa-minus"
                           onClick={() => deleteFollow({username: profile.username, follows: username})}
                        /> Unfollow
                    </div>}
                </div>

                <div>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                Account Details
                            </div>
                            {profile && profile.username === username && <div className="col-1">
                                {edit && <i className="fa fa-x" onClick={(e) => setEdit(false)}/>}
                                {!edit && <i className="fa fa-edit" onClick={(e) => setEdit(true)}/>}
                            </div>}
                        </div>


                    </div>

                    <div className="card-body">
                        <form>
                            {profile && profile.username === username && <div className="row">
                                <div className="mb-3 col-6">
                                    <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                    {!edit && <h6>{details.email}</h6>}
                                    {edit && <input className="form-control" id="inputEmail" type="text"
                                           value={details.email}
                                           onChange={(event) =>
                                               setDetails({...details, 'email': event.target.value})}/>}
                                </div>

                                <div className="mb-3 col-6">
                                    <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                    {!edit && <h6>(hidden)</h6>}
                                    {edit && <input className="form-control" id="inputPassword" type="password"
                                           value={details.password}
                                           onChange={(event) =>
                                               setDetails({...details, 'password': event.target.value})}
                                    />}
                                </div>
                            </div>}

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                    {!edit && <h6>{details.firstName}</h6>}
                                    {edit && <input className="form-control" id="inputFirstName" type="text"
                                           value={details.firstName}
                                           onChange={(event) =>
                                               setDetails({...details, 'firstName': event.target.value})}
                                    />}
                                </div>

                                <div className="mb-3 col-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                    {!edit && <h6>{details.lastName}</h6>}
                                    {edit && <input className="form-control" id="inputLastName" type="text"
                                           value={details.lastName}
                                           onChange={(event) =>
                                               setDetails({...details, 'lastName': event.target.value})}
                                    />}
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label className="small mb-1" htmlFor="inputBio">Bio</label>
                                    {!edit && <h6>{details.bio}</h6>}
                                    {edit && <textarea className="form-control" id="inputBio" type="text"
                                              value={details.bio}
                                              onChange={(event) =>
                                                  setDetails({...details, 'bio': event.target.value})}
                                    />}
                                </div>
                            </div>
                            <hr/>

                            {edit && <div className="row">
                                <div className="btn btn-primary btn-block rounded-pill"
                                     onClick={() => updateProfileDetails(details)}
                                >
                                    <span className="d-md-block">Update</span>
                                </div>
                            </div>}

                        </form>
                    </div>
                </div>


                <h5>Favorites</h5>

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

                <h5>Recent Activity</h5>

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
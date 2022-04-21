import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service.js";
import {useProfile} from "../../contexts/profile-context";

const NavigationSidebar = (
    {
        active = 'home'
    }) => {

    const {profile} = useProfile();


    const navigate = useNavigate();

    const logout = async () => {
        console.log('logging out');
        await service.logout()
        navigate('/signin')
    }

    useEffect(() =>
    {}, [])

    return(
        <div>
            <div className="list-group">
                <Link to="/" className={`list-group-item ${active === "twitter" ? "active" : "inactive"}`}>
                    <i className="fa fa-film"/></Link>

                <Link className={`list-group-item ${active === "home" ? "active" : "inactive"}`} to="/">
                    <i className="fa fa-landmark"/> Home</Link>

                <Link className={`list-group-item ${active === "search" ? "active" : "inactive"}`} to="/search">
                    <i className="fa fa-chart-bar"/> Search</Link>

                {!profile &&
                    <Link className={`list-group-item ${active === "profile" ? "active" : "inactive"}`}
                          to="/signin">
                        <i className="fa fa-user"/> Profile</Link>
                }

                {profile &&
                    <Link className={`list-group-item ${active === "profile" ? "active" : "inactive"}`}
                          to={"/profile/" + profile.username}>
                        <i className="fa fa-user"/> Profile</Link>
                }


                <Link className={`list-group-item ${active === "more" ? "active" : "inactive"}`} to="/">
                    <i className="fa fa-circle"/> More</Link>
            </div>
            {!profile && <div className="d-grid mt-2">
                <Link to="/signin"
                   className="btn btn-primary btn-block rounded-pill">
                    <span className="d-md-block">Login</span>
                </Link>
            </div>}

            {profile && <div className="d-grid mt-2">
                <div
                      className="btn btn-primary btn-block rounded-pill"
                      onClick={logout}
                >
                    <span className="d-md-block">Logout</span>
                </div>
            </div>}

        </div>
    );
}
export default NavigationSidebar;
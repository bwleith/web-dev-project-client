import React from 'react';
import {Link} from "react-router-dom";

const NavigationSidebar = (
    {
        active = 'home'
    }) => {
    return(
        <div>
            <div className="list-group">
                <Link to="/" className={`list-group-item ${active === "twitter" ? "active" : "inactive"}`}>
                    <i className="fa fa-film"></i></Link>

                <Link className={`list-group-item ${active === "home" ? "active" : "inactive"}`} to="/">
                    <i className="fa fa-landmark"></i> Home</Link>

                <Link className={`list-group-item ${active === "search" ? "active" : "inactive"}`} to="/search">
                    <i className="fa fa-chart-bar"></i> Search</Link>

                <Link className={`list-group-item ${active === "profile" ? "active" : "inactive"}`} to="/profile">
                    <i className="fa fa-user"></i> Profile</Link>

                <Link className={`list-group-item ${active === "more" ? "active" : "inactive"}`} to="/">
                    <i className="fa fa-circle"></i> More</Link>
            </div>
            <div className="d-grid mt-2">
                <a href="tweet.html"
                   className="btn btn-primary btn-block rounded-pill">
                    <span className="d-md-block">Login</span>
                </a>
            </div>
        </div>
    );
}
export default NavigationSidebar;
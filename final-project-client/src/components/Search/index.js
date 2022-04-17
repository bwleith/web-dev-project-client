import NavigationSidebar from "../NavigationSidebar";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const Search = () => {

    const titleSearchRef = useRef();
    const {movieSearch} = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const searchUrl = "http://www.omdbapi.com/?apikey=de4824f3";

    const searchByTitle = async () => {
        const searchString = titleSearchRef.current.value || movieSearch || 'batman' ;
        const response = await axios.get(`${searchUrl}&s=${searchString}`);
        setMovies(response.data.Search);
        titleSearchRef.current.value = searchString;
        navigate(`/search/${searchString}`);
    }
    useEffect(() => {
        searchByTitle()
    }, [])
    return(
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                <h1>Omdb Search</h1>
                <ul className="list-group">
                    <li key="searchBar" className="list-group-item">
                        <button
                            onClick={searchByTitle}
                            className="btn btn-primary float-end">Search</button>
                        <input
                            ref={titleSearchRef}
                            className="form-control w-75"/>
                    </li>
                    {
                        movies.map(movie =>
                            <li key={movie.imdbID} className="list-group-item">
                                <Link to={`/details/${movie.imdbID}`}>
                                    <img src={movie.Poster} className="me-2" height={30}/>
                                    {movie.Title}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Search;
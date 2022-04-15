import * as service from '../services/movies-service';

export const FIND_MOVIE = 'FIND_MOVIE';

export const findMovie = async (dispatch, movieToFind) => {
    console.log("inside findMovie. Movie = ", movieToFind);
    const movie = await service.findMovie(movieToFind);
    dispatch({
        type: FIND_MOVIE,
        movie
    });
}
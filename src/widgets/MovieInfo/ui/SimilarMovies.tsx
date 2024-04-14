import React from 'react';
import {SimilarMoviesCarousel} from "entities/Movie";
import {IMovieData} from "entities/Movie";

type Props = {
    movieData: IMovieData
}

const SimilarMovies = ({movieData}: Props) => {
    return (
        <SimilarMoviesCarousel movies={movieData.similarMovies}/>
    );
};

export default SimilarMovies;

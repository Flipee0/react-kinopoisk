import {IMovieShortData} from "./IMovieShortData";
import IMovieRating from "./InfoParts/IMovieRating";
import IMoneyData from "./InfoParts/IMoneyData";
import IFeesData from "./InfoParts/IFeesData";
import IMoviePersonData from "./InfoParts/IMoviePersonData";
import ISimilarMovie from "./InfoParts/ISimilarMovie";
export interface IMovieData extends IMovieShortData {
    rating: IMovieRating,
    votes: IMovieRating,
    description: string,
    slogan: string,
    budget: IMoneyData,
    fees: IFeesData,
    persons: IMoviePersonData[]
    similarMovies: ISimilarMovie[]
}


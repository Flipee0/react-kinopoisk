import kinopoiskApi from "shared/api/kinopoiskApi";
import {IMovieShortData} from "entities/Movie";
import IKinopoiskListResponse from "shared/models/IKinopoiskListResponse";

const getMovies = async (query: string, searching: boolean): Promise<IKinopoiskListResponse<IMovieShortData[]>> => {
    const movies = searching ?
        await kinopoiskApi.get(`v1.4/movie/search?${query}`) :
        await kinopoiskApi.get(`v1.4/movie?${query}`)

    return movies.data
}

export default getMovies

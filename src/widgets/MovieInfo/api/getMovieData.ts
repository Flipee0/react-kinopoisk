import kinopoiskApi from "shared/api/kinopoiskApi";
import {IMovieData} from "entities/Movie";

const getMovieData = async (id: string | number | undefined): Promise<IMovieData> => {
    const movie = await kinopoiskApi.get<IMovieData>(`v1.4/movie/${id}`)

    return movie.data
}

export default getMovieData

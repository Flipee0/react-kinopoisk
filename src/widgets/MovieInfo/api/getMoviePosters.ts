import kinopoiskApi from "shared/api/kinopoiskApi";
import IKinopoiskListResponse from "shared/models/IKinopoiskListResponse";
import {IMoviePoster} from "entities/Posters";

const getPostersData = async (movieId: number, page: number, limit: number = 10): Promise<IKinopoiskListResponse<IMoviePoster[]>> => {
    const posters = await kinopoiskApi.get(`v1.4/image`, {
        params: {
            movieId,
            page,
            limit
        }
    })

    return posters.data
}

export default getPostersData

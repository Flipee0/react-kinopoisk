import kinopoiskApi from "shared/api/kinopoiskApi";
import IKinopoiskListResponse from "shared/models/IKinopoiskListResponse";
import {ISeriesData} from "entities/Series";

const getSeriesData = async (movieId: number, page: number, limit: number = 10): Promise<IKinopoiskListResponse<ISeriesData[]>> => {
    const series = await kinopoiskApi.get("v1.4/season", {
        params: {
            movieId,
            page,
            limit,
            sortField: ["number", "episodes.number"],
            sortType: [1, 1]
        },
        paramsSerializer: {
            indexes: null
        }
    })

    return series.data
}

export default getSeriesData

import kinopoiskApi from "shared/api/kinopoiskApi";
import {IMovieReview} from "entities/Reviews";
import IKinopoiskListResponse from "shared/models/IKinopoiskListResponse";

const getMovieReviews = async (movieId: number, page: number, limit: number = 10): Promise<IKinopoiskListResponse<IMovieReview[]>> => {
    const reviews = await kinopoiskApi.get("v1.4/review", {
        params: {
            movieId,
            page,
            limit
        }
    })

    return reviews.data
}

export default getMovieReviews

import IMovieRating from "./IMovieRating";

export default interface ISimilarMovie {
    id: number,
    name: string,
    poster: {
        url?: string,
    },
    year: 1997,
    rating?: IMovieRating
}

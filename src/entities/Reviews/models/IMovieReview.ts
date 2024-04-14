import ReviewType from "./ReviewType";

export interface IMovieReview {
    id: number
    movieId: number
    title: string
    type: ReviewType
    review: string
    date: Date,
    author: string
    userRating: number
    authorId: number
    createdAt: Date
    updatedAt: Date
    reviewLikes?: number,
    reviewDislikes?: number,
}

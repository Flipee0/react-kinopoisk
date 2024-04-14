export interface IMovieShortData {
    id: number
    name: string
    shortDescription: string
    poster: {
        previewUrl: string
    }
    rating: {
        kp?: number
    }
    year: number
    countries: {
        name: string
    }[]
    genres: {
        name: string
    }[]
    alternativeName: string
    ageRating: number
    movieLength: number
    type: string
}

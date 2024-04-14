interface IKinopoiskListResponse<T> {
    docs: T
    total: number
    limit: number
    page: number
    pages: number
}

export default IKinopoiskListResponse

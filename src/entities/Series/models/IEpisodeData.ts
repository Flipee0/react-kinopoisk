export interface IEpisodeData {
    number: number
    name?: string
    enName?: string
    description?: string
    still?: {
        url?: string
    }
    airDate?: Date
    enDescription?: string
}

import {IEpisodeData} from "./IEpisodeData";

export interface ISeriesData {
    number: number
    episodesCount?: number
    episodes: IEpisodeData[]
    poster?: {
        url?: string
    }
    name?: string
    enName?: string
    duration?: number
    description?: string
    enDescription?: string
    airDate?: Date
}

import RangedFilter from "../models/RangedFilter";
import {ListFilter, ListFilterItem} from "../models/ListFilter";

export const year = new RangedFilter("Годы", "year", 1900, (new Date()).getFullYear())
export const type = new ListFilter("Тип", "type", [
    new ListFilterItem("Фильм", "movie"),
    new ListFilterItem("ТВ-сериал", "tv-series"),
    new ListFilterItem("Мультфильм", "cartoon"),
    new ListFilterItem("Мультсериал", "animated-series"),
    new ListFilterItem("Аниме", "anime"),
])

export const ageRating = new RangedFilter("Возрастной рейтинг", "ageRating", 0, 18)

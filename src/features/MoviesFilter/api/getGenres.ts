import {ListFilterItem} from "../models/ListFilter";
import kinopoiskApi from "shared/api/kinopoiskApi";
import firstUpper from "shared/helpers/firstUpper";

const getGenres = async (): Promise<ListFilterItem[]> => {
    const genres = await kinopoiskApi.get("v1/movie/possible-values-by-field?field=genres.name")
    return genres.data.map((genre: {name: string}) => new ListFilterItem(firstUpper(genre.name), genre.name))
}

export default getGenres

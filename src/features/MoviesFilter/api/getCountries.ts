import {ListFilterItem} from "../models/ListFilter";
import kinopoiskApi from "shared/api/kinopoiskApi";

const getCountries = async (): Promise<ListFilterItem[]> => {
    const countries = await kinopoiskApi.get("v1/movie/possible-values-by-field?field=countries.name")
    return countries.data.map((country: {name: string}) => new ListFilterItem(country.name, country.name))
}

export default getCountries

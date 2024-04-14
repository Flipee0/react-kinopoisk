import {makeAutoObservable} from "mobx"
import RangedFilter from "./RangedFilter"
import BaseFilter from "./BaseFilter";
import {ListFilter} from "./ListFilter";
import {ageRating, type, year} from "../consts/filters";
import getGenres from "../api/getGenres";
import getCountries from "../api/getCountries";
import {SetURLSearchParams} from "react-router-dom";

class FiltersStore {
    private readonly _type: ListFilter
    private readonly _year: RangedFilter
    private readonly _genres: ListFilter
    private readonly _ageRating: RangedFilter
    private readonly _countries: ListFilter

    constructor() {
        makeAutoObservable(this)
        this._type = type
        this._year = year
        this._genres = new ListFilter("Жанр", "genres.name", [], getGenres)
        this._ageRating = ageRating
        this._countries = new ListFilter("Страна", "country.name", [], getCountries)
    }

    private getFilters = (): BaseFilter[] => {
        return (Object.values(this)
            .filter(value => value instanceof BaseFilter) as BaseFilter[])
    }

    setParams = (params: URLSearchParams, setParams: SetURLSearchParams) => {
        this.getFilters().forEach(filter => {
                if (!filter.isLoading && !filter.isError) {
                    params.delete(filter.queryName)
                    if (filter.enabled) {
                        filter.query.forEach(queryParamValue => params.append(filter.queryName, queryParamValue))
                    }
                    setParams(params)
                }
            }
        )
    }

    get year(): RangedFilter {
        return this._year;
    }

    get type(): ListFilter {
        return this._type;
    }

    get genres(): ListFilter {
        return this._genres;
    }

    get ageRating(): RangedFilter {
        return this._ageRating;
    }

    get countries(): ListFilter {
        return this._countries;
    }

    private getFieldByQueryName = (name: string): BaseFilter | undefined => {
        return this.getFilters()
            .find(value => value.queryName === name)
    }

    updateFromQuery = (params: URLSearchParams) => {
        const toUpdate = new Map<BaseFilter, string[]>(this.getFilters().map(filter => [filter, []]))

        params.forEach((value, key) => {
            const field = this.getFieldByQueryName(key)
            if (field === undefined) {
                return
            }
            const fieldInMap = toUpdate.get(field)
            if (fieldInMap !== undefined) {
                fieldInMap.push(value)
            }
        })

        toUpdate.forEach((value, key) => key.updateFromQuery(value))
    }

    get filtersEnabled() {
        return this.getFilters().some(filter => filter.enabled)
    }
}

const filtersStore = new FiltersStore()
export default filtersStore

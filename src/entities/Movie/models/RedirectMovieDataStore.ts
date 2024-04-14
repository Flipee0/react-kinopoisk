import {IMovieShortData} from "./IMovieShortData";

class RedirectMovieDataStore {
    private _queryParams?: string
    private _data?: IMovieShortData
    getData = (): IMovieShortData | undefined => {
        if (this._data) {
            const data = JSON.parse(JSON.stringify(this._data))
            this._data = undefined
            return data
        }
        return undefined
    }
    setData = (newData: IMovieShortData) => {
        this._data = newData
    }

    get queryParams(): string | undefined {
        const result = this._queryParams
        this._queryParams = undefined
        return result;
    }

    set queryParams(value: string | undefined) {
        this._queryParams = value;
    }
}

export const redirectMovieDataStore = new RedirectMovieDataStore()

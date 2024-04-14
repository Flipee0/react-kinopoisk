import {makeAutoObservable} from "mobx";

const getValuesFromLocalStore = (key: string, maxCount: number) => {
    const storageValue = localStorage.getItem(key)
    if (storageValue !== null) {
        const jsonValue = JSON.parse(storageValue)
        if (Array.isArray(jsonValue)) {
            return jsonValue.map(value => value.toString()).slice(0, maxCount)
        }
    }

    return []
}

class Autocomplete {
    private readonly key: string
    private _values: string[]
    private readonly maxCount: number

    constructor(key: string, maxCount: number) {
        makeAutoObservable(this)
        this.key = key + "_search_autocomplete";
        this.maxCount = maxCount
        this._values = getValuesFromLocalStore(this.key, this.maxCount)
    }

    getValues = (): string[] => {
        return this._values
    }

    addValue = (newValue: string) => {
        if (this._values.includes(newValue)) {
            this._values = this._values.filter(value => value !== newValue)
        }
        this._values.unshift(newValue)
        if (this._values.length > this.maxCount) {
            this._values = this._values.slice(0, this.maxCount)
        }
        localStorage.setItem(this.key, JSON.stringify(this._values))
    }
}

export default Autocomplete

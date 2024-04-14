import {action, computed, makeObservable, observable} from "mobx";
import BaseFilter from "./BaseFilter";

class RangedFilter extends BaseFilter {
    private _startValue: number
    private _endValue: number
    getDataFromServer?: () => Promise<number[]>

    constructor(label: string, queryName: string, startValue: number, endValue: number, getDataFromServer?: () => Promise<number[]>) {
        super(label, queryName, getDataFromServer);
        makeObservable<RangedFilter, "_startValue" | "_endValue">(this, {
            startValue: computed,
            endValue: computed,
            updateFromQueryAfterLoad: action,
            updateOptions: action,
            _startValue: observable,
            _endValue: observable,
            query: computed
        })
        this._startValue = startValue;
        this._endValue = endValue;
    }

    get startValue(): number {
        return this._startValue;
    }

    set startValue(value: number) {
        this._startValue = value;
    }

    get endValue(): number {
        return this._endValue;
    }

    set endValue(value: number) {
        this._endValue = value;
    }

    get query(): string[] {
        if (this._startValue === this.endValue) {
            return [this._startValue.toString()]
        }
        return [`${this._startValue}-${this._endValue}`]
    }

    updateFromQueryAfterLoad = (params: string[]) => {
        this.enabled = false
        if (params[0] !== undefined) {
            const separatedParam = params[0].split("-").slice(0, 2).map(param => Number.parseFloat(param))
            if (typeof separatedParam[0] === "number" && typeof separatedParam[1] === "number") {
                this.enabled = true
                this._startValue = separatedParam[0]
                this._endValue = separatedParam[1]
            }
        }
    }

    async updateOptions () {
        if (this.getDataFromServer === undefined) {
            return
        }
        this.isLoading = true
        this.isError = false
        try {
            [this.startValue, this.endValue] = await this.getDataFromServer()
        }
        catch (e) {
            this.isError = true
        }
        finally {
            this.isLoading = false
        }
    }
}

export default RangedFilter

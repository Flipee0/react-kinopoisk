import {observable, computed, makeObservable, autorun, action} from "mobx";

abstract class BaseFilter {
    private readonly _label: string
    private readonly _queryName: string
    protected _enabled: boolean = false
    private _isLoading: boolean
    private _isError: boolean = false
    protected readonly getDataFromServer?: () => Promise<unknown>
    protected constructor(label: string, queryName: string, getDataFromServer?: () => Promise<unknown>) {
        makeObservable<BaseFilter, "_enabled" | "_isLoading" | "_isError">(this, {
            enabled: computed,
            isLoading: computed,
            isError: computed,
            _enabled: observable,
            _isLoading: observable,
            _isError: observable,
            updateFromQuery: action,
            queryName: computed
        })
        this._label = label
        this._queryName = queryName
        this._isLoading = getDataFromServer !== undefined
        this.getDataFromServer = getDataFromServer

        this.updateOptions()
    }
    public abstract get query(): string[]
    public abstract updateFromQueryAfterLoad(params: string[]): void
    public abstract updateOptions(): void

    get label(): string {
        return this._label;
    }

    get enabled(): boolean {
        return this._enabled;
    }
    set enabled(value: boolean) {
        this._enabled = value;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        this._isLoading = value;
    }

    get isError(): boolean {
        return this._isError;
    }

    set isError(value: boolean) {
        this._isError = value;
    }

    get queryName(): string {
        return this._queryName;
    }

    updateFromQuery = (params: string[]) => {
        if (this.isLoading || this.isError) {
            const dispatch = autorun(() => {
                if (!this.isLoading && !this.isError) {
                    this.updateFromQueryAfterLoad(params)
                    dispatch()
                }
            })
        }
        else {
            this.updateFromQueryAfterLoad(params)
        }
    }
}

export default BaseFilter

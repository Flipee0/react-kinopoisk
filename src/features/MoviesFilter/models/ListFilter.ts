import {action, autorun, computed, makeObservable, observable, IReactionDisposer} from "mobx";
import BaseFilter from "./BaseFilter";

export enum ListFilterItemState {
    INCLUDE = "include",
    EXCLUDE = "exclude",
    DISABLED = "disabled"
}

export class ListFilterItem {
    private readonly _label: string
    private readonly _value: string
    private _state: ListFilterItemState = ListFilterItemState.DISABLED

    constructor(label: string, value: string) {
        makeObservable<ListFilterItem, "_state">(this, {
            state: computed,
            _state: observable
        })
        this._label = label;
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    get label(): string {
        return this._label;
    }

    get state(): ListFilterItemState {
        return this._state;
    }

    set state(value: ListFilterItemState) {
        this._state = value;
    }
}

export class ListFilter extends BaseFilter {
    private _items: ListFilterItem[]
    private _itemsMap: Map<string, ListFilterItem> = new Map()
    private _itemsDisposers: IReactionDisposer[] = []

    constructor(label: string, queryName: string, items: ListFilterItem[], getDataFromServer?: () => Promise<ListFilterItem[]>) {
        super(label, queryName, getDataFromServer);
        makeObservable<ListFilter, "_items">(this, {
            items: computed,
            _items: observable,
            updateOptions: action,
            query: computed,
            updateFromQueryAfterLoad: action
        })
        this._items = items
        this.updateMap()
        this.updateDisposers()
    }

    get items(): ListFilterItem[] {
        return this._items;
    }

    set items(value: ListFilterItem[]) {
        this._items = value;
        this.updateMap()
        this.updateDisposers()
    }

    get query(): string[] {
        return this._items
                .filter(item => item.state !== ListFilterItemState.DISABLED)
                .map(item => `${item.state === ListFilterItemState.INCLUDE ? "+" : "!"}${item.value}`)
    }

    updateFromQueryAfterLoad = (params: string[]) => {
        this._items.forEach(item => item.state = ListFilterItemState.DISABLED)
        params.forEach(param => {
            let value = param
            if (param[0] === "+" || param[0] === "!") {
                value = param.slice(1, param.length)
            }
            const item = this.getItemByValue(value)
            if (item === undefined) {
                return
            }
            item.state = param[0] === "!" ? ListFilterItemState.EXCLUDE : ListFilterItemState.INCLUDE
        })
    }

    async updateOptions() {
        if (this.getDataFromServer === undefined) {
            return
        }
        this.isLoading = true
        this.isError = false
        try {
            this.items = await (this.getDataFromServer as () => Promise<ListFilterItem[]>)()
        }
        catch (e) {
            this.isError = true
        }
        finally {
            this.isLoading = false
        }
    }

    private updateDisposers = () => {
        this._itemsDisposers.forEach(disposer => disposer())
        this._itemsDisposers = this._items.map(_ => autorun(() => {
            this.enabled = this.items.find(item => item.state !== ListFilterItemState.DISABLED) !== undefined
        }))
    }

    private updateMap = () => {
        this._itemsMap = new Map<string, ListFilterItem>(this._items.map(item => [item.value, item]))
    }

    getItemByValue = (value: string) => {
        return this._itemsMap.get(value)
    }
}

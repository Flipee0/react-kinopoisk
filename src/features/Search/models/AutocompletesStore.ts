import Autocomplete from "./Autocomplete";

class AutocompletesStore {
    private readonly _movies: Autocomplete

    constructor() {
        this._movies = new Autocomplete("movies", 20)
    }

    get movies(): Autocomplete {
        return this._movies;
    }
}

const autocompletesStore = new AutocompletesStore()
export default autocompletesStore

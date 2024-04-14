import {makeAutoObservable} from "mobx"
import {createTheme} from "@mui/material";

export enum ColorModes {
    LIGHT = "light",
    DARK = "dark"
}

const getInitialColorMode = (): ColorModes => {
    const localStorageMode = localStorage.getItem("colorMode")
    if (localStorageMode !== null && (Object.values(ColorModes) as string[]).includes(localStorageMode)) {
        return localStorageMode as ColorModes
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return ColorModes.LIGHT
    }
    return ColorModes.DARK
}

const LIGHT_THEME = createTheme({
    palette: {
        mode: ColorModes.LIGHT,
    },
})

const DARK_THEME = createTheme({
    palette: {
        mode: ColorModes.DARK,
    },
})

class ColorModeStore {
    private _currentMode: ColorModes = ColorModes.DARK
    constructor() {
        makeAutoObservable(this)
        this.currentMode = getInitialColorMode()
    }

    get currentMode(): ColorModes {
        return this._currentMode;
    }

    set currentMode(value: ColorModes) {
        localStorage.setItem("colorMode", value)
        this._currentMode = value;
    }

    get currentTheme() {
        return this._currentMode === ColorModes.DARK ? DARK_THEME : LIGHT_THEME
    }
}

const colorModeStore = new ColorModeStore()
export default colorModeStore

import React from 'react';
import colorModeStore, {ColorModes} from "shared/models/ColorModeStore";
import {observer} from "mobx-react-lite";
import {IconButton} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ColorModeSwitchButton = observer(() => {
    const handleColorSwitch = () => {
        colorModeStore.currentMode = colorModeStore.currentMode === ColorModes.DARK ? ColorModes.LIGHT : ColorModes.DARK
    }

    return (
        <IconButton
            onClick={handleColorSwitch}
        >
            {colorModeStore.currentMode === ColorModes.DARK && <DarkModeIcon/>}
            {colorModeStore.currentMode === ColorModes.LIGHT && <LightModeIcon/>}
        </IconButton>
    );
});

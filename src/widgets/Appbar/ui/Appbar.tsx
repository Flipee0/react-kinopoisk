import React from 'react';
import {AppbarContainer} from "entities/Appbar";
import {ColorModeSwitchButton} from "features/ColorModeSwitchButton";

export const Appbar = () => {
    return (
        <AppbarContainer colorModeChoose={<ColorModeSwitchButton/>} login={<div/>}/>
    );
};

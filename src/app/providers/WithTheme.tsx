import {CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import {observer} from "mobx-react-lite";
import colorModeStore from "shared/models/ColorModeStore";

const WithTheme = observer(({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={colorModeStore.currentTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
});

export default WithTheme;

import {AppBar, Box } from "@mui/material";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
    appbar: React.ReactNode;
    footer: React.ReactNode;
};

const Layout = ({ children, appbar, footer }: LayoutProps) => {
    return (
        <Box
            sx={{
                bgcolor: "background.appBody",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <AppBar
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: "100",
                    width: "100%"
                }}
            >
                {appbar}
            </AppBar>
            <Box width={"100%"}>{children}</Box>
            <Box marginTop={"auto"}>{footer}</Box>
        </Box>
    );
};

export default Layout;

import {Stack, Toolbar, Typography} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import React from 'react';
import NoDecorationLink from "shared/ui/NoDecorationLink/NoDecorationLink";

type Props = {
    colorModeChoose: React.ReactNode
    login: React.ReactNode
}

export const Appbar = ({colorModeChoose, login}: Props) => {
    return (
        <Toolbar>
            <NoDecorationLink to={"/"}>
                <Stack direction={"row"} alignItems={"center"}>
                    <LocalMoviesIcon/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Кинопоиск
                    </Typography>
                </Stack>
            </NoDecorationLink>
            <Stack direction={"row"} alignItems={"center"} marginLeft={"auto"}>
                {colorModeChoose}
                {login}
            </Stack>
        </Toolbar>
    );
};

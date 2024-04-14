import {
    Box,
    Drawer,
    Typography
} from '@mui/material';
import React from 'react';
import RangedFilterInput from "./RangedFilterInput";
import filtersStore from "../models/FiltersStore";
import {observer} from "mobx-react-lite";
import ListFilterCheckbox from "./ListFilterCheckbox";
import ListFilterSelect from "./ListFilterSelect";

type Props = {
    open: boolean
    onClose: (event: Object, reason: string) => void
}

export const MoviesFilter = observer(({open, onClose}: Props) => {
    return (
        <>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={onClose}
                sx={{
                    zIndex: 200,
                }}
            >
                <Box
                    sx={theme => ({
                        paddingX: "1em",
                        width: "50vw",
                        [theme.breakpoints.down("lg")]: {
                            width: "70vw",
                        },
                        [theme.breakpoints.down("md")]: {
                            width: "80vw",
                        },
                        [theme.breakpoints.down("sm")]: {
                            width: "90vw",
                        }
                    })}
                >
                    <Typography
                        variant={"h6"}
                        sx={{
                            textAlign: "center",
                            marginY: "0.5em"
                        }}
                    >
                        Фильтры
                    </Typography>
                    <RangedFilterInput header={"Годы"} filter={filtersStore.year} minValue={1900} maxValue={2024}/>
                    <ListFilterCheckbox header={"Тип"} filter={filtersStore.type}/>
                    <ListFilterSelect header={"Жанры"} filter={filtersStore.genres}/>
                    <RangedFilterInput header={"Возрастной рейтинг"} filter={filtersStore.ageRating} minValue={0} maxValue={18}/>
                    <ListFilterSelect header={"Страны"} filter={filtersStore.countries}/>
                </Box>
            </Drawer>
        </>
    );
});
